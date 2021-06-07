import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DetailComponent } from './detail/detail.component';
import { AngMusicPlayerModule } from 'ang-music-player';
import { ErrorPageComponent } from '../components/player/error-page/error-page/error-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetailComponent,
    ErrorPageComponent,
   
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AngMusicPlayerModule

  ],
  exports:[
    ErrorPageComponent
  ]
})
export class PagesModule { }
