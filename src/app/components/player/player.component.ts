import { Component, Input, OnInit } from '@angular/core';
import { Music } from 'src/app/models/entity/music';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  
  @Input() audioList = [];

  //DUMMY DATA
  // audioList = [
  //   {
  //     url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  //     title: "Smaple 1",
  //     cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
  //   },
  //   {
  //     url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  //     title: "Sample 2",
  //     cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
  //   },
  //   {
  //     url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  //     title: "Sample 3",
  //     cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
  //   }
  // ];


  constructor() { }

  ngOnInit(): void {
   
  }

}
