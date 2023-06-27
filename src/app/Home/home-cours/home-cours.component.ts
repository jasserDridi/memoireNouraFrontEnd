import { Component,HostListener, ViewChild, ElementRef,OnInit  } from '@angular/core';
import {Router} from "@angular/router";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {FormationResponse} from "../../../service/entities/FormationResponse";
import {FormationService} from "../../../service/formation.service";

@Component({
  selector: 'app-home-cours',
  templateUrl: './home-cours.component.html',
  styleUrls: ['./home-cours.component.css','../../../assets/css/bootstrap.min.css']
})
export class HomeCoursComponent  implements OnInit{
  isServiceTypeReady: boolean = false;
  serviceType: string = '';

  constructor(private router:Router) {
    // Simulating an asynchronous operation to fetch the serviceType
    this.getServiceType().then((type: string) => {
      this.serviceType = type;
      this.isServiceTypeReady = true;
    });
  }
  ngOnInit() {

  }

  // Simulating an asynchronous service call to fetch the serviceType
  getServiceType(): Promise<string> {
    return new Promise(resolve => {
      // Replace this with your actual service call
      setTimeout(() => {
        const type = 'FORMATION'; // Replace this with the fetched serviceType
        resolve(type);
      }, 8000); // Simulating a 2-second delay
    });
  }
  goLogin() {
    this.router.navigate(['/login'])

  }
  protected readonly sessionStorage = sessionStorage;
}
