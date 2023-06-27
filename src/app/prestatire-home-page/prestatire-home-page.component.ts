import { Component ,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-prestatire-home-page',
  templateUrl: './prestatire-home-page.component.html',
  styleUrls: ['./prestatire-home-page.component.css',],
  encapsulation: ViewEncapsulation.None

})
export class PrestatireHomePageComponent {

  welcomeMessage() {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 6 && hours < 18 ? 'Bonjour ' + sessionStorage.getItem('userName')+' 🤗' : 'Bonsoir '+ sessionStorage.getItem('userName')+' 😄';
  }
}
