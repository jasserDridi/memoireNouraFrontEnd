import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.css']
})
export class HomeEventsComponent {
  protected readonly sessionStorage = sessionStorage;

  constructor(private router:Router) {

  }

  goHome() {
    this.router.navigate(['/home'])
  }

  goLogin() {
    this.router.navigate(['/login'])

  }
}
