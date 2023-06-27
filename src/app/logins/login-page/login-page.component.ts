import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../service/users.service";
import {UserRequest} from "../../../service/entities/UserRequest";
import {Router} from "@angular/router";
import {UserResponse} from "../../../service/entities/UserResponse";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css','../style.css','../bootstrap.min.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  warning: boolean= false;
  spining: boolean=false;

  constructor(private fb: FormBuilder,private userService:UsersService,private route:Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.warning=false;
    this.spining=true;
    let userRequest: UserRequest = new UserRequest();
    userRequest.email=this.loginForm.get("email")?.value;
    userRequest.password=this.loginForm.get("password")?.value;

    if(userRequest.email == "admin@gmail.com" && userRequest.password=="admin")
    {
      sessionStorage.setItem('userName', "admin");
      sessionStorage.setItem("userRole","ADMIN");
      this.route.navigate(['/admin/home'])
      this.warning=false;
      this.spining=false;
    }
    this.userService.getUserByEmailAndPassword(userRequest).subscribe(
      (value:UserResponse) =>
      {
        if(userRequest!= null) {
          sessionStorage.setItem('userName', value.nom);
          sessionStorage.setItem("userId",value.id);
          sessionStorage.setItem("userRole",value?.role.toString());


          this.route.navigate(['/home'])

          this.warning=false;
          this.spining=false;
        }
        else
        {
          this.spining=false;
          this.warning=true;
        }
      },
      (error) =>
      {
        this.spining=false;
        this.warning=true;

      }
    )
    console.log(this.loginForm)
  }

}
