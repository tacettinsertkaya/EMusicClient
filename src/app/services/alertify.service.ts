import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import swal from "sweetalert2";

@Injectable({
    providedIn: 'root',
})

export class AlertifyService {

    success(title:string='Success',text:string='',isConfirm:boolean=false){
        swal.fire({
            title:title,
            text: text,
            icon: 'success',
            showConfirmButton: isConfirm,
            timer:2000
          })
    }

    error(title:string='Failed',text:string='',isConfirm:boolean=false){
        swal.fire({
            title: title,
            text: text,
            showConfirmButton: isConfirm,
            icon: 'warning',
            timer:2000
          })
    }

    warning(msg:string){
        swal.fire({
            title: "Warning",
            text:msg,
            icon: 'warning',
            timer:2000
          })
    }

}