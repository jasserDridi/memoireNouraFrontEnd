import { Component } from '@angular/core';

@Component({
  selector: 'app-client-home-page',
  templateUrl: './client-home-page.component.html',
  styleUrls: ['./client-home-page.component.css']
})
export class ClientHomePageComponent {
  welcomeMessage() {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 6 && hours < 18 ? 'Bonjour ' + sessionStorage.getItem('userName')+' 🤗' : 'Bonsoir '+ sessionStorage.getItem('userName')+' 😄';
  }
}
