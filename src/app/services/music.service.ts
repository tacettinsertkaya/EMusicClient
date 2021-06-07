import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserMusicDto } from '../models/dto/music-dto';
import { Music } from '../models/entity/music';
import { MusicListFilter } from '../models/filter/music/music-list-filter';
import { MusicFilter } from '../models/filter/music/music.filter';
import { PaginatedResponse } from '../models/response/paginated-reponse';
import { ResponseData } from '../models/response/response-data';
import { BaseService } from './base.service';
import { EndPoints } from './end-points';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

 

  constructor(private http: HttpClient, private baseService: BaseService) {}


  create(music: Music) :Observable<ResponseData<Music>> {
   
    return this.baseService.post<Music>(
      music,
      environment.serverBaseUrl,
      EndPoints.MUSIC+'/Create'
    );
  }

  update(Music: any):Observable<ResponseData<Music>> {
    return this.baseService.update<Music>(
      Music,
      environment.serverBaseUrl,
      EndPoints.MUSIC + "/Update"
    );
  }

  stateUserMusic(data: any):Observable<ResponseData<UserMusicDto>> {
    return this.baseService.post<UserMusicDto>(
      data,
      environment.serverBaseUrl,
      EndPoints.MUSIC + "/StateUserMusic"
    );
  }
  buyMusic(data: any):Observable<ResponseData<UserMusicDto>> {
    return this.baseService.post<UserMusicDto>(
      data,
      environment.serverBaseUrl,
      EndPoints.MUSIC + "/BuyMusic"
    );
  }


  delete(id: any): Observable<ResponseData<any>> {
   
    return this.baseService.get(
      id,
      environment.serverBaseUrl,
      EndPoints.MUSIC + "/Delete"
    );
  }

  getMusic(filter:MusicFilter): Observable<ResponseData<Music>>  {

    return this.baseService.post<Music>(
      filter,
      environment.serverBaseUrl,
      EndPoints.MUSIC+'/GetByFilterAsync'
    );
  }

  getUserMusic(filter:MusicFilter): Observable<ResponseData<UserMusicDto>>  {

    return this.baseService.post<UserMusicDto>(
      filter,
      environment.serverBaseUrl,
      EndPoints.MUSIC+'/GetUserMusicByFilterAsync'
    );
  }

  getAllMusic(filter:MusicListFilter): Observable<PaginatedResponse<Music>> {
    return this.baseService.listpost<Music>(
      filter,
      environment.serverBaseUrl,
      EndPoints.MUSIC+'/GetListByFilterAsync'
    );
  }

  getAllUserMusic(filter:MusicListFilter): Observable<PaginatedResponse<UserMusicDto>> {
    return this.baseService.listpost<UserMusicDto>(
      filter,
      environment.serverBaseUrl,
      EndPoints.MUSIC+'/GetUserMusicListByFilterAsync'
    );
  }
}
