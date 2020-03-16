import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as fireBase from 'firebase'
import { map, tap, first, filter, last, take } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../../store/actions/ui.actions';
import { SetUserAction, UnSetUserAction } from '../../store/actions/auth.actions';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:User;
  public userSubcription:Subscription = new Subscription();
  public isUserAuth:boolean;
  public userListener:User;

  constructor(
    public afAuth: AngularFireAuth,
    private router:Router,
    private afDB:AngularFirestore,
    private store:Store<AppState>,
  ) {
   }
  
  //Crea un usuario mediante la utenticacion solo por email y password
  createUser(email:string,password:string,firstName:string){

    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(response=>{

      this.user = {
        uid: response.user.uid,
        email: response.user.email,
        firstName: firstName,
      }

      this.afDB.doc(`${this.user.uid}/user`).set(this.user)
      .then( ()=>{
        this.store.dispatch(new DeactivateLoadingAction());
        var actualRoute = window.location.origin;
        window.location.replace(actualRoute+'/authenticated')
      } )

    })
    .catch(error=>{
      console.error(error);
      this.store.dispatch(new DeactivateLoadingAction());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    })
  }
  
  // Inicia sesion solo por email y password
  loginUser(email:string,password:string){
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(response=>{
      
      var actualRoute = window.location.origin;
			window.location.replace(actualRoute+'/authenticated')
      this.store.dispatch(new DeactivateLoadingAction());
    })
    .catch(error=>{
      console.error(error)
      this.store.dispatch(new DeactivateLoadingAction());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    })
  }

  //Cierra la sesion de un usuario
  logut(){
    this.afAuth.auth.signOut();
    this.router.navigate(["/auth/login"]);
  }

  //Se encarga de escuchar si el usuario autentificado ha cambiado su estado
  initAuthListener(){
    this.afAuth.authState.subscribe((fbUser:fireBase.User)=>{
      if(fbUser){
        this.userSubcription = this.afDB.doc(`${fbUser.uid}/user`).valueChanges().subscribe( (user:any) => {
          const newUser:User = {
            uid: user.uid,
            email: user.email,
            firstName: user.firstName,
          }
          this.userListener = newUser;
          this.store.dispatch(new SetUserAction(newUser));
        });
      }else{
        this.userListener = null;
        this.userSubcription.unsubscribe();
        this.store.dispatch(new UnSetUserAction());
      }
    })
  }

  //Verifica si hay un usuario autenticado para retornar el Guard
  isAuth(){
    return this.afAuth.authState.pipe(
      map(fbUser=>{
        //console.log("Auth: ", fbUser)
        if(fbUser===null){
          this.router.navigate(['/auth/login']);
        }else{
          return true
        }
      })
    )
  }
  //Verifica si hay un un usuario autenticado que intente accedeer al login o register para retornar el Guard
  isAuthRedirect(){
    return this.afAuth.authState.pipe(
      map(fbUser=>{
        //console.log("Autenticated: ", fbUser)
        if(fbUser!=null){
          this.router.navigate(['/authenticated']);
        }else{
          return true
        }
      })
    )
  }
  
  //Obtiene los datos del usuario cuando cambia su estado
  getUser(){
    return this.userListener;
  }

  getToken(){

  }
  
}
