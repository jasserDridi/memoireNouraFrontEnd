import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {EventRequest} from "./entities/EventRequest";
import {FormationRequest} from "./entities/FormationRequest";
import {ServiceRequest} from "./entities/ServiceRequest";

@Injectable({
  providedIn: 'root'
})

export class EntityMapperService {

    constructor() {
    }

    formation(addForm: FormGroup, listImage: NzUploadFile[]): FormationRequest {

        let formationRequest = new FormationRequest();
        formationRequest.id= addForm.get("id")?.value;
        formationRequest.nom = addForm.get("name")?.value;
        formationRequest.description = addForm.get("description")?.value;
        formationRequest.contenu = addForm.get("contenu")?.value;
      formationRequest.instructorId=addForm.get("prestatireId")?.value;
      formationRequest.instructorNom=addForm.get("prestatireNom")?.value;
        formationRequest.dure = addForm.get("dure")?.value;
        formationRequest.prix = addForm.get("prix")?.value;
        formationRequest.language = addForm.get("language")?.value;
        formationRequest.niveau = addForm.get("niveau")?.value;
      formationRequest.niveau = addForm.get("prerequis")?.value;

      formationRequest.category = addForm.get("category")?.value;
        formationRequest.offersCertification = addForm.get("offersCertification")?.value;
        listImage.forEach((value, index) => {
            let res: Response = value.response
            formationRequest.galories.push(res.url);
        });
        return formationRequest;
    }
    Service(addForm: FormGroup, listImage: NzUploadFile[]): ServiceRequest {

        let serviceRequest = new ServiceRequest();
        serviceRequest.id=addForm.get("id")?.value;
        serviceRequest.nom = addForm.get("name")?.value;
        serviceRequest.description = addForm.get("description")?.value;
      serviceRequest.instructorId=addForm.get("prestatireId")?.value;
      serviceRequest.instructorNom=addForm.get("prestatireNom")?.value;
        serviceRequest.dure = addForm.get("dure")?.value;
        serviceRequest.prix = addForm.get("prix")?.value;
        serviceRequest.category = addForm.get("category")?.value;
        listImage.forEach((value, index) => {
            let res: Response = value.response
            serviceRequest.galories.push(res.url);
        });
        return serviceRequest;
    }
    EventRequestMapper(addForm: FormGroup, listImage: NzUploadFile[]): EventRequest {

            let event = new EventRequest();
      event.id=addForm.get("id")?.value;
      event.nom= addForm.get("name")?.value;
      event.description=addForm.get("description")?.value;
      event.endDate=addForm.get("endDate")?.value;
      event.startDate=addForm.get("startDate")?.value;
      event.instructorId=addForm.get("prestatireId")?.value;
      event.instructorNom=addForm.get("prestatireNom")?.value;
      event.nbrTicket=addForm.get("ticketsNumber")?.value;
      event.lieu=addForm.get("place")?.value;
      event.prix=addForm.get("price")?.value;
      event.category=addForm.get("category")?.value;
            listImage.forEach((value, index) => {
              let  res:Response =value.response
              event.galories.push(res.url);
            });
            return event;

    }
    promotionAddMapper(addForm: FormGroup, listImage: ServiceDto[]): PromotionRequest {

        let promotionRequest = new PromotionRequest();
        promotionRequest.dateDebut=addForm.get("dateDebut")?.value;
        promotionRequest.dateFin=addForm.get("dateFin")?.value;
        promotionRequest.prestatireId=addForm.get("prestatireId")?.value;

        promotionRequest.pourcentage=addForm.get("remise")?.value;
        console.log(listImage);
        promotionRequest.services=listImage;
        return promotionRequest;

    }
}
export interface Response {
  url: string;
  // other properties that your response might have
}

export class PromotionRequest {
    dateDebut: string ="";
    dateFin:string="";
    services: ServiceDto[]=[];
    pourcentage: number=0;
    prestatireId:string="";
    constructor(

    ) {

    }

}
export class PromotionResponse {
    id: string="";
    date: string="";
    services: ServiceDto[]=[];
    pourcentage: number=0;
    prestatireId:string="";

    constructor(

    ) {

    }
}
export class ServiceDto {
    serviceId: string;
    serviceName: string;
    serviceType: ServiceType;

    constructor(
        serviceId: string,
        serviceName: string,
        serviceType: ServiceType
    ) {
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.serviceType = serviceType;
    }
}

export enum ServiceType {
    // Define your service types here
    SERVICE = 'SERVICE',
    FORMATION = 'FORMATION',
    EVENT = 'EVENT',
}
