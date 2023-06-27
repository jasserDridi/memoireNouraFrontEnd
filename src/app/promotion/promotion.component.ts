import { Component } from '@angular/core';
import {EventService} from "../../service/event.service";
import {EntityMapperService, ServiceDto, ServiceType} from "../../service/entity-mapper.service";
import {FormationService} from "../../service/formation.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {map} from "rxjs";
import {PromotionService} from "../../service/promotion.service";
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {
  sucess: any;
  selectedValue: any;

  loading: boolean | undefined

  constructor(private promotion: PromotionService, private modal: NzModalService, private entityMapper: EntityMapperService, private msg: NzMessageService, private formationService: FormationService) {
    this.getEvents();

  }

  showDeleteConfirm(id: string): void {

    this.modal.confirm({
      nzTitle: 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getEvents() {
    this.loading = true
    // @ts-ignore
    this.promotion.getPromotions(sessionStorage.getItem('userId')).pipe(map((response: any) => response as DataFormationItem[]))
      .subscribe(
        (value) => {
          console.log(value)
          this.loading = false
          this.listOfData = value;
        },
        (error) => {

        })
  }


  listOfColumn = [
    {
      title: 'Date Debut',
      priority: false, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Date Fin',
      priority: false, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Pourcentage de réduction',
      priority: false, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Articles',
      priority: 1, sortFn: null // Add this line to fix the issue

    }
    ,
    {
      title: 'Actions',
      priority: 1, sortFn: null // Add this line to fix the issue

    }
  ];

  listOfColumnService = [
    {
      title: 'Nom service',
      priority: false, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Type service',
      priority: false, sortFn: null // Add this line to fix the issue

    }
  ];
  listOfData: DataFormationItem[] = []
  listOfDataService:ServiceDto[] = []
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

  showModalServices(data: any): void {
    console.log("ShowModal clicked :" + data.galories)
    this.isVisible = true;
  }

  handleOk(): void {

    this.isOkLoading = false;
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(data:any) {
    this.listOfDataService=data.services;
    console.log(this.listOfDataService)
    this.isVisible = true;
  }
}
export interface DataFormationItem {
  id: string;
  dateDebut: string;
  dateFin: string;
  pourcentage: number;
  services: ServiceDto[];
  serivceId:string;
  serviceName:string;
  serviceType:ServiceType;
}
