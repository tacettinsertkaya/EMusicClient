import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class SharedService {
    isGeneralModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isMissionModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    constructor(private http: HttpClient) { }

    public setModalValue(value: boolean) {
        this.isGeneralModalSubject.next(value);
    }


    public get getModalValue(): boolean {
        return this.isGeneralModalSubject.value;
    }



    public setMissionModalValue(value: boolean) {
        this.isMissionModalSubject.next(value);
    }

    public get getMissionModalValue(): boolean {
        return this.isMissionModalSubject.value;
    }

   

}
