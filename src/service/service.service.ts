import { Injectable } from '@angular/core';
import {EventRequest} from "./entities/EventRequest";
import {HttpClient} from "@angular/common/http";
import {ServiceRequest} from "./entities/ServiceRequest";
import {FormationResponse} from "./entities/FormationResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl="http://localhost:8081/api/v1/service";

  constructor(private http:HttpClient) { }

  getServices()
  {
    return this.http.get(this.baseUrl)
  }

  deleteService(id: string) {
    return this.http.delete(this.baseUrl+"/"+id);
  }

  updateService(eventRequest :ServiceRequest )
  {
    return this.http.put(this.baseUrl,eventRequest)
  }
  addService(eventRequest:ServiceRequest)
  {
    return  this.http.post(this.baseUrl,eventRequest);
  }

  getServicesByCategory(category:string): Observable<any> {
      return this.http.post(this.baseUrl+"/"+category,{})

  }

  getServiceById(itemId: string) {
    return this.http.get(this.baseUrl+"/user/"+itemId)

  }
}
