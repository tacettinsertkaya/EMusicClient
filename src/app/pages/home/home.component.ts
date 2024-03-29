import { Component, NgZone, OnInit } from '@angular/core';
import { debounce } from 'lodash';
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
  filter = new MusicListFilter();

  constructor(
    private musicService:MusicService,
    private userService:UserService,
    private notifHub:NotifHubService,
    private _ngZone: NgZone
  ) {
    this.getNotifSubjectEvents();
    this.updateFilter = debounce(this.updateFilter, 1000)
   }

  ngOnInit(): void {
    
    this.getMusicList();
  }

  private getNotifSubjectEvents(): void {
    this.notifHub.notifReceived.subscribe((notif: string) => {
      this._ngZone.run(() => {
      

  
      });
    });
  }

  updateFilterFocus(event: any) {
    const val = event.target.value.toLowerCase();
    this.filter.pageNumber = 1;
    this.filter.pageSize = 10;
    this.filter.searchParams=val;

    this.getAllMusicByFilter(this.filter);

   
  }
 
  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    let filter = new MusicListFilter();
    filter.pageNumber = 1;
    filter.pageSize = 10;
    filter.searchParams=val;

    this.getAllMusicByFilter(filter);


  
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
