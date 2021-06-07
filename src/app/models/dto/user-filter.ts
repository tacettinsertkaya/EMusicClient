import { PaginationFilter } from "../request/pagination-filter";

export class UserFilter extends PaginationFilter{
     companyId:string | null=null;
     userName:string  | null=null;
     name:string  | null=null;
     surname:string  | null=null;
     email:string  | null=null;
     filterRoles:Array<string>=[];
}