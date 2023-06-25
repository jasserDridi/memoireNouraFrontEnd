import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PromotionResponse, ServiceDto} from "./entity-mapper.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  baseUrl="http://localhost:8100/api/v1/promotion";
  getServices()
  {
    return this.http.get(this.baseUrl+"/getServices")
      .pipe(
        map(response => response as ServiceDto[])
      );
  }
  getPromotions(id:string)
  {
    console.log("log for id promotion : ",id);
    return this.http.get(this.baseUrl+"/"+id)
      .pipe(
        map(response => response as ServiceDto[])
      );
  }
  addPromotion(promotion:any)
  {
    return this.http.post(this.baseUrl,promotion)
  }
  constructor(private http:HttpClient) { }

  getPromotionsByServiceId(id: string) {
    return this.http.get(this.baseUrl+"/findByServiceId/"+id)
      .pipe(
        map(response => response as PromotionResponse)
      );

  }
}
