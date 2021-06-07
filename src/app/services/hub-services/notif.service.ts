import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../alertify.service';


@Injectable({
  providedIn: 'root'
})
export class NotifHubService {

 
  connectionEstablished = new EventEmitter<Boolean>();
  notifReceived = new EventEmitter<string>();


  private connectionIsEstablished = false;
  private _hubConnection!: HubConnection;

  constructor(
    private alertifyService:AlertifyService
  ) {
      this.createConnection();
      this.startConnection();       
      this.getNotif();
  }

  private createConnection() {


    this._hubConnection = new HubConnectionBuilder()
        .withUrl(environment.serverBaseUrl + "/NotifHub")
        .configureLogging(LogLevel.Debug)
        .build();
}

private async startConnection(): Promise<void> {
    await this._hubConnection
        .start()
        .then(() => {
            this.connectionIsEstablished = true;
            this.connectionEstablished.emit(true);
        })
        .catch((err:any) => {
            console.log("Error while establishing connection, retrying...");
            setTimeout(()=> {
                this.startConnection();
            }, 5000);
        });


}

  private getNotif(): void {
    this._hubConnection.on("notifReceiver", (data: any) => {
        console.log("data",data);
        this.alertifyService.success("Succeed",data);
    });
  }



}
