import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  welcomeMessage() {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 6 && hours < 18 ? 'Bonjour Admin 🤗' : 'Bonsoir Admin 😄';
  }
}
