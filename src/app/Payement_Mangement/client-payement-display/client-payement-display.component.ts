import { Component } from '@angular/core';
import {EntityMapperService} from "../../../service/entity-mapper.service";
import {FormBuilder} from "@angular/forms";
import { map } from 'rxjs';
import {NzMessageService} from "ng-zorro-antd/message";
import { NzModalService } from 'ng-zorro-antd/modal';
import {PayementServiceService} from "../../../service/payement-service.service";
@Component({
  selector: 'app-client-payement-display',
  templateUrl: './client-payement-display.component.html',
  styleUrls: ['./client-payement-display.component.css']
})
export class ClientPayementDisplayComponent {

  loading :boolean | undefined
  nzAction: any="https://api.cloudinary.com/v1_1/dgdsoqyok/image/upload";
  constructor(private payementService:PayementServiceService,private modal:NzModalService,private fb:FormBuilder,private entityMapper :EntityMapperService,private msg: NzMessageService) {
    this.getEvents();

  }

  showDeleteConfirm(payement:any ): void {
    payement.status="Accepte";
    this.payementService.updatePayementStatus(payement).subscribe(value => {console.log(value);this.getEvents() });

  }
  showRefuseConfirm(payement:any ): void {
    payement.status="Refuse";
    this.payementService.updatePayementStatus(payement).subscribe(value => {console.log(value);this.getEvents() });
  }
  getEvents()
  {
    this.loading=true
    // @ts-ignore
    this.payementService.getClientPayements(sessionStorage.getItem("userId")).pipe(  map((response: any) => response as DataItem[]))
      .subscribe(
        (value) =>
        {
          console.log(value)
          this.loading=false
          this.listOfData=value;
        },
        (error)  =>
        {

        })
  }
  listOfColumn = [
    {
      title: 'Prestatire',
      compare: (a: DataItem, b: DataItem) => a.nom.localeCompare(b.nom),
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'itemType',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'prix',
      compare: (a: DataItem, b: DataItem) => a.lieu.localeCompare(b.lieu),
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'status',
      compare: (a: DataItem, b: DataItem) => a.prix - b.prix,
      priority: 1, sortFn: null // Add this line to fix the issue

    }
  ];
  listOfData: DataItem[] = []

  formatDate(dateString: string): string {
    const date: Date = new Date(dateString);
    const formattedDate: string = `${this.padZero(date.getDate())}-${this.padZero(date.getMonth() + 1)}-${date.getFullYear()}`;
    const formattedTime: string = `${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`;

    return `${formattedDate} ${formattedTime}`;
  }

  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  isVisible = false;
  isOkLoading = false;

  getLastSegmentFromUrl(url: string ) {
    const lastSlashIndex = url.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      return url.substring(lastSlashIndex + 1);
    }
    return '';
  }


  handleCancel(): void {
    this.isVisible = false;
  }
  fillFormData()
  {
    return {
      'cloudName': 'dgdsoqyok',
      'upload_preset': 'angular' };
  }

}
export interface DataItem {
  id: string ;
  nom: string ;
  description: string ;
  lieu: string ;
  prix: number ;
  startDate: string ;
  endDate: string ;
  nbrTicket: number ;
  category: string ;
  status:string ;
  itemType : string;
  clientNom: string;
  prestatireNom:string;
  galories: string[];
}
