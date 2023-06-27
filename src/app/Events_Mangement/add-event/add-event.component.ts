import {Component, OnInit, SecurityContext, TemplateRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzMessageService} from "ng-zorro-antd/message";
import {NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {filter, Observable, Subscription} from "rxjs";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import { UploadServiceService} from "../../../service/upload-service.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {EntityMapperService} from "../../../service/entity-mapper.service";
import {EventRequest} from "../../../service/entities/EventRequest";
import {EventService} from "../../../service/event.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEventComponent implements OnInit {
  addForm: FormGroup;
  nzAction: any="https://api.cloudinary.com/v1_1/dgdsoqyok/image/upload";
  validateForm!: UntypedFormGroup;
  listImage: NzUploadFile[]=[]

  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];


  constructor(private fb:FormBuilder,private msg: NzMessageService,private entityMapper : EntityMapperService,private eventService :EventService,private notification: NzNotificationService) {
      this.addForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        place: ['', Validators.required],
        price: ['', Validators.required],

        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        ticketsNumber: ['', Validators.required],
        category: ['', Validators.required],
        prestatireId:[sessionStorage.getItem("userId")],
        prestatireNom:[sessionStorage.getItem('userName')]
      });


  }





  fillFormData()
  {
    return {
      'cloudName': 'dgdsoqyok',
      'upload_preset': 'angular' };
  }


sucess:any;
  selectedValue: any;
  addEvent() {
    console.log( this.entityMapper.EventRequestMapper(this.addForm,this.listImage));
    if (this.addForm.invalid) {
      console.log("Formulaire : ",this.addForm)
      this.notification.warning('', 'Veuillez vérifier, vous avez peut-être <br> laissé un champ vide',
        {nzDuration: 20000,
          nzStyle: {backgroundColor: 'rgb(213,199,29)', color: '#fff'}});
      Object.values(this.addForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

    } else {
      this.sucess = false;
      let eventRequest: EventRequest = this.entityMapper.EventRequestMapper(this.addForm, this.listImage);
      this.eventService.addEvent(eventRequest).subscribe(
        (value) => {
          this.sucess = true;
          this.notification.success('', 'Événement ajouté avec succès', {
            nzDuration: 20000,
            nzStyle: {backgroundColor: '#08b218', color: '#fff'}
          });
        },
        (error) => {
          this.sucess= false;
          this.notification.error('', 'Erreur lors de l\'ajout de l\'événement', {
            nzDuration: 20000,
            nzStyle: {backgroundColor: 'rgb(255,23,23)', color: '#fff'}
          });
          console.log(error)

        }
        // Handle error response
      );
    }
  }


    ngOnInit(): void {
    this.validateForm = this.fb.group({
      formLayout: ['horizontal'],
      fieldA: [null, [Validators.required]],
      filedB: [null, [Validators.required]]
    });
  }

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
