import { Component, NgZone, OnInit } from '@angular/core';
import { UserMusicDto } from 'src/app/models/dto/music-dto';
import { Music } from 'src/app/models/entity/music';
import { MusicListFilter } from 'src/app/models/filter/music/music-list-filter';
import { NotifHubService } from 'src/app/services/hub-services/notif.service';
import { MusicService } from 'src/app/services/music.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  musicList:Array<UserMusicDto>=[];

  constructor(
    private musicService:MusicService,
    private userService:UserService,
    private notifHub:NotifHubService,
    private _ngZone: NgZone
  ) {
    this.getNotifSubjectEvents();

   }

  ngOnInit(): void {
    
    this.getMusicList();
  }

  private getNotifSubjectEvents(): void {
    this.notifHub.notifReceived.subscribe((notif: string) => {
      this._ngZone.run(() => {
      

          alert("test");
  
      });
    });
  }


  
  addFavorite(userMusic:UserMusicDto) {
   
   
      userMusic.isFavorite=!userMusic.isFavorite;
    
     this.updateMusicState(userMusic);
  }

  

  isLogged(){
    return  this.userService.isAuthorized();
  }

  


  updateMusicState(data:UserMusicDto){
    this.musicService
    .stateUserMusic(data)
    .subscribe(
      (res) => {
        this.getMusicList();
      },
      (error) => {
      }
    );
  }


  
  getMusicList(){
    let filter = new MusicListFilter();
    filter.pageNumber = 1;
    filter.pageSize = 10;
    this.getAllMusicByFilter(filter);
  }

  getAllMusicByFilter(filter:MusicListFilter) {



    this.musicService
      .getAllUserMusic(filter)
      .subscribe(
        (res) => {
          this.musicList = res.data;
         
        },
        (error) => {
        }
      );
  }

}
