export class IngresoEgreso{
    description:string;
    amount:string;
    type:string;
    uid?:string;

    constructor(data){
        this.description = data && data.description || null;
        this.amount = data && data.amount || null;
        this.type = data && data.type || null;
    }
}