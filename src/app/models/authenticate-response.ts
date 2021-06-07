
export class AuthenticateResponse{
    userId:string='';
    userName:string='';
    name:string='';
    surname:string='';
    token:string='';
    expiration:Date=new Date();
    roles:Array<string>=[];
}