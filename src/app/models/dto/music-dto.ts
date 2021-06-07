import { Music } from "../entity/music";

export class UserMusicDto{
    music:Music=new Music;
    isFavorite:boolean=false;
    isPurchashing:boolean=false;
    isViewed:boolean=false;
    
}