import { Injectable } from '@angular/core';
import {FormationRequest} from "./entities/FormationRequest";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Chat, ChatResponse, User} from "../app/client-messagerie/client-messagerie.component";

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {


  baseUrl="http://localhost:8087/api/v1/messagerie";
  getMessagerie()
  {
    return this.http.get(this.baseUrl)
  }
  getServicesByUser(id:string)
  {
    return this.http.get(this.baseUrl+"/user/"+id)
  }
  addFormation(formation:FormationRequest )
  {
    return  this.http.post(this.baseUrl,formation);
  }
  constructor(private http:HttpClient) { }

  getFormationsByCategory(category: string):Observable<any>  {
    return this.http.post(this.baseUrl+"/"+category,{})

  }

  getFormationById(itemId: string) {
    return   this.http.get(this.baseUrl+"/"+itemId)

  }

  addChat(chat: Chat) {
    return this.http.post(this.baseUrl,chat)

  }

  getChat(chat: Chat) {
    return  this.http.post(this.baseUrl+"/bidirectionalChat",chat)
      .pipe(
      map(response => response as ChatResponse[])
    );

  }

  deleteMessage(message: string) {
    return   this.http.delete(this.baseUrl+"/"+message)

  }
}
