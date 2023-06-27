import { Component } from '@angular/core';
import { ViewEncapsulation} from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {map} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntityMapperService} from "../../../service/entity-mapper.service";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {UsersService} from "../../../service/users.service";

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent {
  loading: boolean | undefined

  constructor(private usersService: UsersService, private modal: NzModalService, private fb: FormBuilder, private entityMapper: EntityMapperService, private msg: NzMessageService) {
    this.getUsers();

  }

  showDeleteConfirm(id: string): void {

    this.modal.confirm({
      nzTitle: 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.usersService.deleteUser(id).subscribe(value => {
        console.log(value);
        this.getUsers()
      }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getUsers() {
    this.loading = true
    // @ts-ignore
    this.usersService.getUsers().pipe(map((response: any) => response as DataItem[]))
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
      title: 'Nom ',
      compare: (a: DataItem, b: DataItem) => a.nom.localeCompare(b.nom),
      priority: false, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Prenom',
      priority: false, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Email',
      compare: (a: DataItem, b: DataItem) => a.lieu.localeCompare(b.lieu),
      priority: false, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'NumeroTel',
      priority: 1, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Mote de passe',
      priority: false, sortFn: null // Add this line to fix the issue

    },
    {
      title: 'Role',
      priority: false
    },
    {
      title: 'Actions',
      priority: false, sortFn: null // Add this line to fix the issue

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
  defaultFileList: NzUploadFile[] = []


  getLastSegmentFromUrl(url: string) {
    const lastSlashIndex = url.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      return url.substring(lastSlashIndex + 1);
    }
    return '';
  }
}
export interface DataItem {
  id: string ;
  nom: string ;
  prenom: string ;
  lieu: string ;
  email:string;
  numeroTel: number ;
  role : string;
}
