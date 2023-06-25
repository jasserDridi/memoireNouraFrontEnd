import { Injectable } from '@angular/core';
import {FormationRequest} from "./entities/FormationRequest";
import {HttpClient} from "@angular/common/http";
import {PayementRequest} from "./entities/PayementRequest";

@Injectable({
  providedIn: 'root'
})
export class PayementServiceService {

  baseUrl="http://localhost:8085/api/v1/payement";
  getServices()
  {
    return this.http.get(this.baseUrl)
  }


  constructor(private http:HttpClient) { }

  addPayement(payement: PayementRequest) {
    return  this.http.post(this.baseUrl,payement);

  }

    updatePayementStatus(payement: PayementRequest) {
      return  this.http.put(this.baseUrl,payement);

    }

  getPayements(id:String ) {
    console.log("prestatire id :"+id)
    return  this.http.get(this.baseUrl+"/"+id);

  }
  getClientPayements(id:String)
  {
    return  this.http.get(this.baseUrl+"/client/"+id);

  }
  getEventPayement(id:String)
  {
    console.log(id);
    return  this.http.get(this.baseUrl+"/eventPayement/"+id);

  }

}
