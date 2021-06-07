import { Base } from "../base";
import { MediaType } from "../enums/media-type";

export class UserMedia extends Base{
     userCardId:string='';
     mediaTitle:string='';
     mediaId:string='';
     mediaLink:string='';
     viewCount:number=0;
     isActive:boolean= true;
     order:number=0;
     mediaType:number = MediaType.Link;
}