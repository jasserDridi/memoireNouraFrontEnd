import {Component, ViewEncapsulation} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {map} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntityMapperService} from "../../../service/entity-mapper.service";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-events-display',
  templateUrl: './events-display.component.html',
  styleUrls: ['./events-display.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class EventsDisplayComponent {
  addForm: FormGroup
  loading :boolean | undefined
  nzAction: any="https://api.cloudinary.com/v1_1/dgdsoqyok/image/upload";
  constructor(private eventService:EventService,private modal:NzModalService,private fb:FormBuilder,private entityMapper :EntityMapperService,private msg: NzMessageService) {
this.getEvents();
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      place: ['', Validators.required],
      price: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      ticketsNumber: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  showDeleteConfirm(id: string ): void {

    this.modal.confirm({
      nzTitle: 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.eventService.deleteEvent(id).subscribe(value => {console.log(value);this.getEvents() }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  getEvents()
  {
    this.loading=true
    // @ts-ignore
    this.eventService.getEventByUser(sessionStorage.getItem('userId')).pipe(  map((response: any) => response as DataItem[]))
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
      title: 'Nom Complete',
      compare: (a: DataItem, b: DataItem) => a.nom.localeCompare(b.nom),
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Description',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Lieu',
      compare: (a: DataItem, b: DataItem) => a.lieu.localeCompare(b.lieu),
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Prix',
      compare: (a: DataItem, b: DataItem) => a.prix -b.prix,
      priority: 1,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Debut Date',
      compare: (a: DataItem, b: DataItem) => a.startDate.localeCompare(b.startDate),
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Fin Date',
      compare: (a: DataItem, b: DataItem) => a.endDate.localeCompare(b.endDate),
      priority: false
    },
    {
      title: 'Tickets',
      priority: 2,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Category',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Galories',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title:'Actions',
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
  defaultFileList:NzUploadFile[]=[]
  showModal(data:any): void {
    console.log("ShowModal clicked :"+data.galories)
    for( let   imageUrl in data.galories)
    {
      let i=0;
      let newFile: NzUploadFile = {} as NzUploadFile;

      newFile.url=imageUrl;
      newFile.status='done';
      newFile.name=this.getLastSegmentFromUrl(imageUrl)
      this.defaultFileList.push(newFile);
    }
    for( let   imageUrl in this.defaultFileList) {
      console.log("fileList"+imageUrl.toString())

    }

    this.isVisible = true;
    this.addForm = this.fb.group({
      id:[data.id],
      name: [data.nom, Validators.required],
      description: [data.description],
      place: [data.lieu, Validators.required],
      price: [data.prix, Validators.required],
      startDate: [data.startDate, Validators.required],
      endDate: [data.endDate, Validators.required],
      ticketsNumber: [data.nbrTicket, Validators.required],
      category: [data.category, Validators.required],
      prestatireId:[sessionStorage.getItem("userId")],
      prestatireNom:[sessionStorage.getItem('userName')]
    });




  }
   getLastSegmentFromUrl(url: string ) {
    const lastSlashIndex = url.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      return url.substring(lastSlashIndex + 1);
    }
    return '';
  }
  handleOk(): void {

    this.isOkLoading = true;
    this.eventService.updateEvent(this.entityMapper.EventRequestMapper(this.addForm,this.listImage))
      .subscribe(value => {
        console.log("updated event ",value)
        this.isVisible = false;
        this.isOkLoading = false;
      this.getEvents()})

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
  listImage: NzUploadFile[]=[]
  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    console.log('formData:', file.originFileObj);

    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(` Chargement réussi de ${file.name}`);
      this.listImage=fileList;
    } else if (status === 'error') {
      this.msg.error(` echec de chargement de ${file.name}`);
    }
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
  galories: string[];
}
