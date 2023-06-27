import { Component } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {EntityMapperService} from "../../../service/entity-mapper.service";
import {EventService} from "../../../service/event.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {EventRequest} from "../../../service/entities/EventRequest";
import {FormationService} from "../../../service/formation.service";
import {FormationRequest} from "../../../service/entities/FormationRequest";

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent {
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


  constructor(private fb:FormBuilder,private msg: NzMessageService,private entityMapper : EntityMapperService,private formationService :FormationService,private notification: NzNotificationService) {
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





  fillFormData()
  {
    return {
      'cloudName': 'dgdsoqyok',
      'upload_preset': 'angular' };
  }


  sucess:any;
  selectedValue: any;
  addEvent() {
    console.log( this.entityMapper.formation(this.addForm,this.listImage));
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
      let formationRequest: FormationRequest = this.entityMapper.formation(this.addForm, this.listImage);
      this.formationService.addFormation(formationRequest).subscribe(
        (value) => {
          this.sucess = true;
          this.notification.success('', 'formation ajouté avec succès', {
            nzDuration: 20000,
            nzStyle: {backgroundColor: '#08b218', color: '#fff'}
          });
        },
        (error) => {
          this.sucess= false;
          this.notification.error('', 'Erreur lors de l\'ajout de formation', {
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

