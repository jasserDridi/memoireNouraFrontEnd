import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css','../../../assets/css/bootstrap.min.css']
})
export class HomeHeaderComponent {


  constructor(private location: Location) {
  }
  protected readonly sessionStorage = sessionStorage;

  logout() {
    this.sessionStorage.removeItem("userName");
    location.reload();
  }

}
