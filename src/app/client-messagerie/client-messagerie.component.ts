import { Component } from '@angular/core';
import {UsersService} from "../../service/users.service";
import {MessagerieService} from "../../service/messagerie.service";
export class Chat
{
  public  expediteurId:string;
  public  destinataireId: string;
  public  messages: Message[];
  constructor(expediteurId: string, destinataireId: string, messages: Message[]) {
    this.expediteurId = expediteurId;
    this.destinataireId = destinataireId;
    this.messages = messages;
  }

}
export class ChatResponse
{
  public id;
  public  expediteurId:string;
  public  destinataireId: string;
  public  messages: Message[];
  constructor(id:string,expediteurId: string, destinataireId: string, messages: Message[]) {
    this.expediteurId = expediteurId;
    this.id=id;
    this.destinataireId = destinataireId;
    this.messages = messages;
  }

}
export class Message {
  public chatId : string;
  public expediteurId: string;
  public destinataireId: string;
  public message: string;
  public date: string;

  constructor(chatId:string,expediteurId: string, destinataireId: string, message: string, date: string) {
    this.expediteurId = expediteurId;
    this.destinataireId = destinataireId;
    this.message = message;
    this.date = date
    this.chatId=chatId;
  }
}
  export class MessageResponse
{
  public  chatId:string;
  public   id:string;
  public   expediteurId:string;
  public  destinataireId: string;
  public  message: string;
  public  date :string;

  constructor(chatId:string,id:string,expediteurId: string, destinataireId: string, message: string,date:string) {
    this.expediteurId = expediteurId;
    this.destinataireId = destinataireId;
    this.message = message;
    this.id=id;
    this.date=date
    this.chatId=chatId;

  }
}
export class User {
  public id: string;
  public nom: string;
  public prenom: string;
  public numeroTel : string;
  public lieu : string;


  constructor(id: string, nom: string, prenom: string,numeroTel: string,lieu: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.numeroTel=numeroTel
    this.lieu=lieu
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getNom(): string {
    return this.nom;
  }

  getPrenom(): string {
    return this.prenom;
  }

  // Setters
  setId(id: string): void {
    this.id = id;
  }

  setNom(nom: string): void {
    this.nom = nom;
  }

  setPrenom(prenom: string): void {
    this.prenom = prenom;
  }
}


@Component({
  selector: 'app-client-messagerie',
  templateUrl: './client-messagerie.component.html',
  styleUrls: ['./client-messagerie.component.css']
})
export class ClientMessagerieComponent {
    colorList: string[]=[];
    clickedUser: User ;
    users: User[] =[];
    message:string="";
    protected readonly Date = Date;
   chat: any;
   clickedIndice: number=0;
    constructor(private userService:UsersService,private messagerieService:MessagerieService) {
      this.clickedUser=new User("","utilisateur","utilisateur","","")
      this.getUsers()
    }
  positionMap = {
    street: "Brookline",
    num: "123",
    city: "NewYork"
  };
  mapsURL = `https://maps.google.com/maps?q=${this.positionMap.street}%20${this.positionMap.num}%20%${this.positionMap.city}&t=&z=20&ie=UTF8&iwloc=&output=embed`;
    getDateFormat()
    {
      const date = new Date();

      const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      };

      const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
      const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
     return     `${formattedTime} - ${formattedDate}`;
    }

    getUsers()
    {
      if(sessionStorage.getItem('userRole')=='CLIENT') {
        this.userService.getPrestatires().subscribe(value =>
        {
          console.log("user length",this.users.length)

          this.users = value
          for (let i = 0; i < this.users.length; i++) {
            this.colorList[i]= this.generateRandomColor();
          }
          console.log("color list ",this.colorList)

        })
      }
      else
      {
        this.userService.getClients().subscribe(value => {
          this.users = value
          console.log("user length",this.users.length)
          for (let i = 0; i < this.users.length; i++) {
            this.colorList[i]= this.generateRandomColor();
          }
          console.log("color list ",this.colorList)

        })
      }

    }

  getClickedUser(user: any,i:number) {
    console.log("User : " + JSON.stringify(user));
    this.clickedUser=user;
    this.getChat()
    this.clickedIndice=i;
  }

  getChat()
  {
    if(sessionStorage.getItem('userRole')=='CLIENT') {
      // @ts-ignore
      let   chat:Chat= new Chat(sessionStorage.getItem('userId'),this.clickedUser.id,null)
      this.messagerieService.getChat(chat).subscribe(value => { this.chat=value; console.log(value)},
        (error) =>
        {
          this.chat="";
        }

      );    }
    else
    {
      // @ts-ignore
      let   chat:Chat= new Chat(this.clickedUser.id,sessionStorage.getItem('userId'))
      this.messagerieService.getChat(chat).subscribe(value => { this.chat=value; console.log(value)},
        (error) =>
        {
          this.chat="";
        }

      );
    }


  }
  addChat()
  {
    var messages: Message[] = [];
    let   chat:ChatResponse;

      if(this.chat != undefined && this.chat.messages != undefined)
      {
        messages= this.chat.messages;
        // @ts-ignore
        var message:Message = new Message(this.chat.id,sessionStorage.getItem('userId'),this.clickedUser.id,this.message,this.getDateFormat())

        messages.push(message);
        chat=this.chat;
      }
      else
      {
        // add new chat
        // @ts-ignore
        var message:Message = new Message("",sessionStorage.getItem('userId'),this.clickedUser.id,this.message,this.getDateFormat())

        messages.push(message);
        // @ts-ignore
        chat= new ChatResponse("",sessionStorage.getItem('userId'),this.clickedUser.id,messages)

      }

    //For add new message

    // @ts-ignore
    console.log("Message: " + JSON.stringify(message));

    // @ts-ignore
    console.log("chat: " + JSON.stringify(chat));
    this.messagerieService.addChat(chat).subscribe(value =>
      this.getChat())
  }

  deleteMessage(message: string) {
    this.messagerieService.deleteMessage(message).subscribe(value =>
      this.getChat())
  }

  getDate(date: string)
  {
   return  date.substring(0,19)
  }
  createLogo(user:User): string {
    const firstInitial = user.prenom.charAt(0).toUpperCase();
    const lastInitial = user.nom.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }
   generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  protected readonly sessionStorage = sessionStorage;
}
