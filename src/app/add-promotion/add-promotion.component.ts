import {Component, OnInit} from '@angular/core';
import {EntityMapperService, ServiceDto, ServiceType} from "../../service/entity-mapper.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from "ng-zorro-antd/message";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {PromotionService} from "../../service/promotion.service";

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit{
  listOfOption: Array<{ value: ServiceDto; label: string }> = []
  listOfSelectedValue:ServiceDto[]= [];
  addForm: FormGroup;
   services:any;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private entityMapper: EntityMapperService, private promotionService: PromotionService, private notification: NzNotificationService) {
    this.addForm = this.fb.group({
      dateDebut : ['', Validators.required],
      dateFin : ['', Validators.required],
      prestatireId:[sessionStorage.getItem('userId')],
      remise:['', Validators.required]
    });

  }
  handleSelectedValues(selectedValues: ServiceDto[]): void {
    this.listOfSelectedValue = selectedValues;
  }
  onchange()
  {
    console.log(this.listOfSelectedValue);
  }
  sucess: any;
  selectedValue: any;
  getServices() {
    this.promotionService.getServices().subscribe(value => {this.mapToListOfOption(value);console.log(value)})
  }
  mapToListOfOption(values:ServiceDto[])
  {
    const children:  Array<{ value: ServiceDto; label: string }> = [];

    for (let  valuesKey of values) {

      children.push({'value':valuesKey,'label':valuesKey.serviceName});
    }

    this.listOfOption=children;

  }
  ngOnInit(): void {
    this.getServices();
    console.log(this.listOfOption)
  }

  addPromotion() {

    if (this.addForm.invalid) {
      console.log("Formulaire : ", this.addForm)
      this.notification.warning('', 'Veuillez vérifier, vous avez peut-être <br> laissé un champ vide',
        {
          nzDuration: 20000,
          nzStyle: {backgroundColor: 'rgb(213,199,29)', color: '#fff'}
        });
      Object.values(this.addForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });

    } else {
      this.sucess = false;
      console.log(this.listOfSelectedValue);
      this.promotionService.addPromotion(this.entityMapper.promotionAddMapper(this.addForm,this.listOfSelectedValue)).subscribe(
        (value) => {
          console.log(value)
          this.sucess = true;
          this.notification.success('', 'Promotion ajouté avec succès', {
            nzDuration: 20000,
            nzStyle: {backgroundColor: '#08b218', color: '#fff'}
          });
        },
        (error) => {
          this.sucess = false;
          this.notification.error('', 'Erreur lors de l\'ajout de le promotion', {
            nzDuration: 20000,
            nzStyle: {backgroundColor: 'rgb(255,23,23)', color: '#fff'}
          });
          console.log(error)

        }
        // Handle error response
      );
    }
  }



}

