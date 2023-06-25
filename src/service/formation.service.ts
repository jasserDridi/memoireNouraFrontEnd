import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventRequest} from "./entities/EventRequest";
import {FormationRequest} from "./entities/FormationRequest";
import {UserResponse} from "./entities/UserResponse";
import {FormationResponse} from "./entities/FormationResponse";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  baseUrl="http://localhost:8080/api/v1/formation";
  getServices()
  {
    return this.http.get(this.baseUrl)
  }
  getServicesByUser(id:string)
  {
    return this.http.get(this.baseUrl+"/user/"+id)
  }
  updateFormation(formation:FormationRequest )
  {
    return  this.http.put(this.baseUrl,formation);
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
}
