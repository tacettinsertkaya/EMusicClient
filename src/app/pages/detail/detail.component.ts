import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Audio } from 'src/app/models/dto/audio';
import { UserMusicDto } from 'src/app/models/dto/music-dto';
import { Music } from 'src/app/models/entity/music';
import { MusicFilter } from 'src/app/models/filter/music/music.filter';
import { MusicService } from 'src/app/services/music.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  music: Music | null = null;
  userMusic: UserMusicDto | null = null;
  audioList: Array<Audio> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicService: MusicService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : '';
    let filter = new MusicFilter();
    filter.id = id;
    this.getMusicByFilter(filter);
  }



  buyClick(music: Music) {
    let data = new UserMusicDto();

    if (!this.userMusic) {
      data.music = music;
      data.isPurchashing = true;
    }
    else {
      this.userMusic.isPurchashing=true;
      data = this.userMusic;
    }
   this.buyMusic(data);
  }

  
  isLogged(){
    return this.userService.isAuthorized();
  }
  
  buyMusic(data:UserMusicDto){
    this.musicService
    .buyMusic(data)
    .subscribe(
      (res) => {
        this.router.navigate(["/"])
      },
      (error) => {
      }
    );
  }

  updateMusicState(data:UserMusicDto){
    this.musicService
    .stateUserMusic(data)
    .subscribe(
      (res) => {
        this.router.navigate(["/"])
      },
      (error) => {
      }
    );
  }

  getUserMusicByFilter(filter: MusicFilter) {

    this.musicService
      .getUserMusic(filter)
      .subscribe(
        (res) => {
          this.userMusic = res.data;
         
        },
        (error) => {
        }
      );
  }

  getMusicByFilter(filter: MusicFilter) {

    this.musicService
      .getMusic(filter)
      .subscribe(
        (res) => {
          this.music = res.data;
        
          this.getUserMusicByFilter(filter);
          let audio = new Audio();
          audio.title = this.music.name ? this.music.name : '';
          audio.url = this.music.coverUrl ? this.music.coverUrl : '';
          audio.cover = this.music.coverImage ? this.music.coverImage : '';

          this.audioList.push(audio)
        },
        (error) => {
        }
      );
  }

  
}
