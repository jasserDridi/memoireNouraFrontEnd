import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrestataireBackOfficeComponent} from "./prestataire-back-office/prestataire-back-office.component";
import {AddEventComponent} from "./Events_Mangement/add-event/add-event.component";
import {PrestatireHomePageComponent} from "./prestatire-home-page/prestatire-home-page.component";
import {EventsDisplayComponent} from "./Events_Mangement/events-display/events-display.component";
import {FormationReadComponent} from "./Formation_Mangement/formation-read/formation-read.component";
import {AddFormationComponent} from "./Formation_Mangement/add-formation/add-formation.component";
import {AddServiceComponent} from "./Service_Mangement/add-service/add-service.component";
import {ServiceDisplayComponent} from "./Service_Mangement/service-display/service-display.component";
import {HomeComponent} from "./HomePage/home/home.component";
import {HomeBannerComponent} from "./HomePage/home-banner/home-banner.component";
import {LoginPageComponent} from "./logins/login-page/login-page.component";
import {SignUpPageComponent} from "./logins/sign-up-page/sign-up-page.component";
import {HomeCoursComponent} from "./Home/home-cours/home-cours.component";
import {HomeEventsComponent} from "./Home/home-events/home-events.component";
import {HomeServiceComponent} from "./Home/home-service/home-service.component";
import {HomeAboutUsComponent} from "./Home/home-about-us/home-about-us.component";
import {ClientBacKOfficeComponent} from "./client-bac-koffice/client-bac-koffice.component";
import {ClientHomePageComponent} from "./client-home-page/client-home-page.component";
import {CardsLineComponent} from "./cards-line/cards-line.component";
import {ItemDetailsComponent} from "./item-details/item-details.component";
import {PayementDisplayComponent} from "./Payement_Mangement/payement-display/payement-display.component";
import {
  ClientPayementDisplayComponent
} from "./Payement_Mangement/client-payement-display/client-payement-display.component";
import {ClientqrCodeComponent} from "./clientqr-code/clientqr-code.component";
import {ClientMessagerieComponent} from "./client-messagerie/client-messagerie.component";
import {PromotionComponent} from "./promotion/promotion.component";
import {AddPromotionComponent} from "./add-promotion/add-promotion.component";
import {UserDisplayComponent} from "./AdminBackOffice/user-display/user-display.component";
import {AdminBackOfficeComponent} from "./AdminBackOffice/admin-back-office/admin-back-office.component";
import {AdminHomeComponent} from "./AdminBackOffice/admin-home/admin-home.component";

const routes: Routes = [
  {path:'',component:HomeComponent,children:[{path:'home',component :HomeBannerComponent},
      {path:'login',component: LoginPageComponent},
      {path:'cours',component:HomeCoursComponent},
      {path:'events',component:HomeEventsComponent},
      {path:'services',component:HomeServiceComponent},
      {path:'aboutUs',component:HomeAboutUsComponent},
          {path:'testCard',component: CardsLineComponent},
          { path: 'itemDetails', component: ItemDetailsComponent },

          {path:'signUp',component: SignUpPageComponent}]},
  { path:'prestatire',component : PrestataireBackOfficeComponent,children:[
      {path:'homePage',component : PrestatireHomePageComponent},
      {path:'payement',component:PayementDisplayComponent},
      {path:'events',component : EventsDisplayComponent},
      {path:'addEvent',component:AddEventComponent},
      {path:'formation',component:FormationReadComponent},
      {path:'addFormation',component:AddFormationComponent},
      {path:'services',component:ServiceDisplayComponent},
      {path:'promotion',component: PromotionComponent},
      {path:'addPromotion',component: AddPromotionComponent},

      {path:'messagerie',component: ClientMessagerieComponent},
      {path:'addService',component:AddServiceComponent}
    ]},
  { path:'client',component : ClientBacKOfficeComponent,children:
      [
        {path:'messagerie',component: ClientMessagerieComponent},
        {path:'transactions',component: ClientPayementDisplayComponent},
          {path:'home',component:ClientHomePageComponent},
        {path:'events',component : ClientqrCodeComponent},

      ]


  },
  { path:'admin',component : AdminBackOfficeComponent,children:
      [
        {path:'users',component: UserDisplayComponent},
        {path:'home',component: AdminHomeComponent},


      ]


  }
];

    @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
