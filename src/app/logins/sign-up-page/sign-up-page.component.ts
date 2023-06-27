import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../service/users.service";
import {UserRequest, UserRole} from "../../../service/entities/UserRequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css','../style.css','../bootstrap.min.css']
})
export class SignUpPageComponent {
  loginForm: FormGroup;
  passwordVisible = false;
  password?: string;
  passwordVisible2 = false;
  password2?: string;
  radioValue='A';
  selectedOption: string;
  spining: boolean=false;
   warning: boolean=false;

  constructor(private fb: FormBuilder,private userService:UsersService,private router: Router) {
    this.loginForm = this.fb.group({
      nom: ['', Validators.required],
      prenom:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telNbr: ['', Validators.required],
      lieu: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],


    });
    this.selectedOption="";
  }

  onSubmit() {
console.log(    this.selectedOption)
    let userRequest;
    if (this.loginForm.status == "VALID" && this.loginForm.dirty) {
      if (this.loginForm.get("password")?.value == this.loginForm.get("confirmPassword")?.value) {
        userRequest = new UserRequest();
        userRequest.email=this.loginForm.get("email")?.value;
        userRequest.prenom=this.loginForm.get("prenom")?.value;
        userRequest.nom=this.loginForm.get("nom")?.value;
        userRequest.numeroTel=this.loginForm.get("telNbr")?.value;
        userRequest.lieu=this.loginForm.get("lieu")?.value;
        userRequest.password=this.loginForm.get("password")?.value;
        userRequest.role=this.loginForm.get("role")?.value;
        this.spining=true
        this.userService.addService(userRequest).subscribe(value => {
          console.log(value)
          this.spining=false
            sessionStorage.setItem('userName', value.nom);
            sessionStorage.setItem("userId",value.id);
            sessionStorage.setItem("userRole",value?.role.toString());
          this.router.navigate(['/home']);
          },
        (error) =>
        {

          this.spining=false;
          this.warning=true;
        }
        )
      }
    }
  }

  disabled() {

    if(this.loginForm.status == "VALID" && this.loginForm.dirty)
    {
      if( this.loginForm.get("password")?.value ==  this.loginForm.get("confirmPassword")?.value)
      {
       return  false;
      }
      return true
    }
return true;
  }

  addUser() {
    let userRequest;
    if (this.loginForm.status == "VALID" && this.loginForm.dirty) {
      if (this.loginForm.get("password")?.value != this.loginForm.get("confirmPassword")?.value) {
        return true;
      }
      return false;
    }
    return false;

  }

  def() {
    console.log(this.radioValue)
  }
}
