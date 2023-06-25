import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  constructor(private http:HttpClient) { }

  uploadImage(vals :FormData): Observable<any>
  {
    let data=vals;
  return   this.http.post('https://api.cloudinary.com/v1_1/dgdsoqyok/image/upload' ,data,{reportProgress:true})

  }
}
