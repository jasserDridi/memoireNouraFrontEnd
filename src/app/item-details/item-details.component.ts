import {Component, OnInit, TemplateRef} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {PayementRequest} from "../../service/entities/PayementRequest";
import { ActivatedRoute } from '@angular/router';
import {FormationService} from "../../service/formation.service";
import {EventService} from "../../service/event.service";
import {ServiceService} from "../../service/service.service";
import { PayementServiceService } from 'src/service/payement-service.service';
import {PromotionService} from "../../service/promotion.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements  OnInit
{
  images = [
    {url: 'https://via.placeholder.com/200'},
    {url: 'https://via.placeholder.com/300'},
    {url: 'https://via.placeholder.com/500'},
  ];

  itemType:string;
  itemId:string;
  selectedImage: string="";
  data :any;
  constructor(private promotion: PromotionService,private fourmationService:FormationService,private eventService:EventService ,private serviceService:ServiceService, private notification: NzNotificationService,private payementService:PayementServiceService,private route: ActivatedRoute) {
    this.itemType = this.route.snapshot.queryParams['itemType'];
    this.itemId = this.route.snapshot.queryParams['id'];
    this.retreiveData()
  }
  ngOnInit() {
    // Retrieve the value from the router query parameters

    this.selectedImage = this.images[0].url

  }
  async retreiveData() {
    if (this.itemType == "SERVICE") {
     const service= await this.serviceService.getServiceById(this.itemId).toPromise();
        console.log(service);
        this.data = service;
        this.images = this.data.images;

    }
    if (this.itemType == "FORMATION") {
      const service=  await this.fourmationService.getFormationById(this.itemId).toPromise() ;
        console.log(service);
        this.data = service;
        this.images = this.data.galories
    }
    if (this.itemType == "EVENT") {
      const service= await this.eventService.getEventById(this.itemId).toPromise();
        console.log(service);
        this.data = service;
        this.images = this.data.galories
    }



      const promotion = await this.promotion.getPromotionsByServiceId(this.data.id).toPromise();
      if (promotion != null) {
        console.log('valueKey.prix:', this.data.prix);
        console.log('promotion.remise:', promotion.pourcentage);
        this.data.isPromotional = true;
        this.data.pourcentage=promotion.pourcentage;
        this.data.prix = parseFloat(this.data.prix);
        promotion.pourcentage = parseFloat(String(promotion.pourcentage));
        if (promotion.pourcentage !== 0) {
          this.data.promotionalPrice = this.data.prix + ((this.data.prix * promotion.pourcentage) / 100);

        } else {
          this.data.promotionalPrice = this.data.prix;
        }
      } else {
        this.data.isPromotional = false;
        this.data.promotionalPrice = this.data.prix;

      }
    }

  selectImage(imageUrl: any): void {
    this.selectedImage = imageUrl;
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(template: TemplateRef<{}>): void {

      this.isOkLoading = true;
      let  payement = new PayementRequest();
      // @ts-ignore
    payement.clientId=sessionStorage.getItem("userId");
      payement.prestatireId=this.data.instructorId;
      payement.prix=this.data.prix;
      payement.itemType=this.itemType;
      payement.itemId=this.itemId;
      payement.status="En attente";
      // @ts-ignore
    payement.clientNom=sessionStorage.getItem("userName");
    payement.prestatireNom=this.data.instructorNom;

      this.payementService.addPayement(payement).subscribe(value => {
        this.isVisible = false;
        this.isOkLoading = false;
          console.log(value);
          this.createBasicNotification(template);
        }
      )
    }


  handleCancel(): void {
    this.isVisible = false;
  }
  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template,{nzDuration:10000});
  }

  protected readonly sessionStorage = sessionStorage;
}
