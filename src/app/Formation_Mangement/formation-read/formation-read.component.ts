import { Component } from '@angular/core';
import {EventService} from "../../../service/event.service";
import {EntityMapperService} from "../../../service/entity-mapper.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {map} from "rxjs";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {FormationService} from "../../../service/formation.service";

@Component({
  selector: 'app-formation-read',
  templateUrl: './formation-read.component.html',
  styleUrls: ['./formation-read.component.css']
})
export class FormationReadComponent {
  sucess:any;
  selectedValue: any;
  addForm: FormGroup
  loading :boolean | undefined
  nzAction: any="https://api.cloudinary.com/v1_1/dgdsoqyok/image/upload";
  constructor(private eventService:EventService,private modal:NzModalService,private fb:FormBuilder,private entityMapper :EntityMapperService,private msg: NzMessageService,private formationService:FormationService) {
    this.getEvents();
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      prix: ['', Validators.required],
      contenu: ['', Validators.required],
      dure: ['', Validators.required],
      language: ['', Validators.required],
      niveau: ['', Validators.required],
      prerequis: ['', Validators.required],
      offersCertification: ['', Validators.required],
      category: ['', Validators.required],
      published : [false],
      prestatireId:[sessionStorage.getItem("userId")],
      prestatireNom:[sessionStorage.getItem('userName')]
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
    this.formationService.getServicesByUser(sessionStorage.getItem('userId')).pipe(  map((response: any) => response as DataFormationItem[]))
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
      title: 'Contenu',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Dure',
      priority: 1,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Prix',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Language',
      priority: false
    },
    {
      title: 'Niveau',
      priority: 2,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Prerequis',
      priority: false,      sortFn: null // Add this line to fix the issue

    },
    {
      title: 'offersCertification',
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
      contenu: [data.contenu, Validators.required],
      dure: [data.dure, Validators.required],
      language: [data.language, Validators.required],
      niveau: [data.niveau, Validators.required],
      prerequis: [data.prerequis, Validators.required],
      offersCertification: [data.offersCertification, Validators.required],
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
    this.formationService.updateFormation(this.entityMapper.formation(this.addForm,this.listImage))
      .subscribe(value => {this.isVisible = false;
        this.isOkLoading = false;this.getEvents() })

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
export interface DataFormationItem {
  id: string;
  nom: string;
  description: string;
  contenu: string;
  dure: number;
  instructorId: string;
  prix: number;
  language: string;
  niveau: string;
  prerequis: string;
  offersCertification: boolean;
  images: string[];
}
