import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventRequest} from "./entities/EventRequest";
import {Observable} from "rxjs";
import {DataItem} from "../app/Events_Mangement/events-display/events-display.component";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl="http://localhost:8099/api/v1/event";
  constructor(private http:HttpClient) { }


  addEvent(eventRequest:EventRequest)
  {
   return  this.http.post(this.baseUrl,eventRequest);
  }
  getEventByUser(id: string)
  {
    console.log(id);
    return this.http.get(this.baseUrl+"/user/"+id)
  }

  deleteEvent(id: string) {
    return this.http.delete(this.baseUrl+"/"+id);
  }

  updateEvent(eventRequest :EventRequest )
  {
    return this.http.put(this.baseUrl,eventRequest)
  }

  getEventsByCategory(category: string):Observable<any> {
      return this.http.post(this.baseUrl+"/"+category,{})


  }

  getEventById(item: any) {
    return   this.http.get(this.baseUrl+"/"+item)

  }


}
