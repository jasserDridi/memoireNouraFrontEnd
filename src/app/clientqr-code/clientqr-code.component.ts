import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { map } from 'rxjs';
import {NzMessageService} from "ng-zorro-antd/message";
import { NzModalService } from 'ng-zorro-antd/modal';
import {PayementServiceService} from "../../service/payement-service.service";
@Component({
  selector: 'app-clientqr-code',
  templateUrl: './clientqr-code.component.html',
  styleUrls: ['./clientqr-code.component.css']
})
export class ClientqrCodeComponent {

  loading :boolean | undefined
  nzAction: any="https://api.cloudinary.com/v1_1/dgdsoqyok/image/upload";
  dataForModal: string="";
  constructor(private payementService:PayementServiceService
              ,private modal:NzModalService,private fb:FormBuilder,private msg: NzMessageService) {
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
    this.payementService.getEventPayement(sessionStorage.getItem("userId")).pipe(  map((response: any) => response as DataItem[]))
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
      title: "nom d'evenement",
      compare: (a: DataItem, b: DataItem) => a.nom.localeCompare(b.nom),
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: "Lieu",
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'prix',
      compare: (a: DataItem, b: DataItem) => a.lieu.localeCompare(b.lieu),
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'date debut',
      compare: (a: DataItem, b: DataItem) => a.prix - b.prix,
      priority: 1, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'date fin',
      compare: (a: DataItem, b: DataItem) => a.prix - b.prix,
      priority: 1, sortFn: null // Add this line to fix the issue
    }
    ,
    {
      title: 'category',
      priority: false,      sortFn: null // Add this line to fix the issue
    },
    {
      title: 'status',
      priority: false,      sortFn: null // Add this line to fix the issue
    }
    ,
    {
      title: 'Ticket',
      priority: false,      sortFn: null // Add this line to fix the issue
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

  isVisibleTop = false;
  isVisibleMiddle = false;

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalMiddle(data: string): void {
    this.isVisibleMiddle = true;
    this.dataForModal = data;

  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
}
export interface DataItem {
  eventNom :string;
nom:string;
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
  qrCode:string;
  galories: string[];
}
