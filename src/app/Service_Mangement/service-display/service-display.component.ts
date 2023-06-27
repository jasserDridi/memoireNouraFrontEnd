import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../service/event.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {EntityMapperService} from "../../../service/entity-mapper.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {map} from "rxjs";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {ServiceService} from "../../../service/service.service";

@Component({
  selector: 'app-service-display',
  templateUrl: './service-display.component.html',
  styleUrls: ['./service-display.component.css']
})
export class ServiceDisplayComponent {
  addForm: FormGroup
  loading :boolean | undefined
  nzAction: any="https://api.cloudinary.com/v1_1/dgdsoqyok/image/upload";
  constructor(private serviceService:ServiceService,private modal:NzModalService,private fb:FormBuilder,private entityMapper :EntityMapperService,private msg: NzMessageService) {
    this.getEvents();
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      prix: ['', Validators.required],
      category: ['', Validators.required],
      published : [false]
    });
  }

  showDeleteConfirm(id: string ): void {

    this.modal.confirm({
      nzTitle: 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.serviceService.deleteService(id).subscribe(value => {console.log(value);this.getEvents() }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  getEvents()
  {
    this.loading=true
    // @ts-ignore
    this.serviceService.getServiceById(sessionStorage.getItem('userId')).pipe(  map((response: any) => response as DataFormationItem[]))
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
      compare: (a: DataFormationItem, b: DataFormationItem) => a.nom.localeCompare(b.nom),
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Description',
      priority: false,      sortFn: null // Add this line to fix the issue

    },

    {
      title: 'Prix',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title:'Category',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title:'Images',
      priority: false,      sortFn: null // Add this line to fix the issue

    },

    {
      title:'Actions',
      priority: false,      sortFn: null // Add this line to fix the issue

    }
  ];
  listOfData: DataFormationItem[] = []

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
      prix: [data.prix, Validators.required],
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
    this.serviceService.updateService(this.entityMapper.Service(this.addForm,this.listImage))
      .subscribe(value => {this.isVisible = false;this.getEvents()
        this.isOkLoading = false; })

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
  selectedValue: any;
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
export interface DataFormationItem {
  id: string;
  nom: string;
  description: string;
  contenu: string;
  dure: number;
  instructorId: string;
  prix: number;
  category: string;
  language: string;
  images: string[];
}
