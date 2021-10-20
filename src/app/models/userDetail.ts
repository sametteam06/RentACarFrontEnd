export interface UserDetail{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    passwordHash:string;
    passwordSalt:string;
    status:boolean;
    findexPoint:number;
}