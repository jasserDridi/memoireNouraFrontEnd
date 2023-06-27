import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PrestataireBackOfficeComponent} from "./prestataire-back-office/prestataire-back-office.component";
import {AddEventComponent} from "./Events_Mangement/add-event/add-event.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzSpinModule} from "ng-zorro-antd/spin";
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import {UploadServiceService} from "../service/upload-service.service";
import {EntityMapperService} from "../service/entity-mapper.service";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {EventService} from "../service/event.service";
import {NzCardModule} from "ng-zorro-antd/card";
import { PrestatireHomePageComponent } from './prestatire-home-page/prestatire-home-page.component';
import { EventsDisplayComponent } from './Events_Mangement/events-display/events-display.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {FormationReadComponent} from "./Formation_Mangement/formation-read/formation-read.component";
import { AddFormationComponent } from './Formation_Mangement/add-formation/add-formation.component';
import { ServiceDisplayComponent } from './Service_Mangement/service-display/service-display.component';
import { AddServiceComponent } from './Service_Mangement/add-service/add-service.component';
import {HomeBannerComponent} from "./HomePage/home-banner/home-banner.component";
import {HomeComponent} from "./HomePage/home/home.component";
import {HomeHeaderComponent} from "./HomePage/home-header/home-header.component";
import {LoginPageComponent} from "./logins/login-page/login-page.component";
import {SignUpPageComponent} from "./logins/sign-up-page/sign-up-page.component";
import {FooterComponent} from "./HomePage/footer/footer.component";
import {NzResultModule} from "ng-zorro-antd/result";
import { HomeCoursComponent } from './Home/home-cours/home-cours.component';
import { HomeEventsComponent } from './Home/home-events/home-events.component';
import { HomeServiceComponent } from './Home/home-service/home-service.component';
import { HomeAboutUsComponent } from './Home/home-about-us/home-about-us.component';
import { ClientBacKOfficeComponent } from './client-bac-koffice/client-bac-koffice.component';
import { ClientHomePageComponent } from './client-home-page/client-home-page.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { HomeCoursByCategoryComponent } from './home-cours-by-category/home-cours-by-category.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { HomeCoursBusinessComponent } from './home-cours-business/home-cours-business.component';
import { CardsLineComponent } from './cards-line/cards-line.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { PayementDisplayComponent } from './Payement_Mangement/payement-display/payement-display.component';
import { ClientPayementDisplayComponent } from './Payement_Mangement/client-payement-display/client-payement-display.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ClientqrCodeComponent } from './clientqr-code/clientqr-code.component';
import { PayementEventsComponent } from './payement-events/payement-events.component';
import { ClientMessagerieComponent } from './client-messagerie/client-messagerie.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import {SafePipe} from "../service/safe-pipe";
import { PromotionComponent } from './promotion/promotion.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { AdminBackOfficeComponent } from './AdminBackOffice/admin-back-office/admin-back-office.component';
import { UserDisplayComponent } from './AdminBackOffice/user-display/user-display.component';
import { AdminHomeComponent } from './AdminBackOffice/admin-home/admin-home.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PrestataireBackOfficeComponent,
    HomeBannerComponent,
    HomeComponent,
    HomeHeaderComponent,
    LoginPageComponent,
    SignUpPageComponent,
    FooterComponent,
    AddEventComponent,
    PrestatireHomePageComponent,
    EventsDisplayComponent,
    FormationReadComponent,
    AddFormationComponent,
    ServiceDisplayComponent,
    AddServiceComponent,
    HomeCoursComponent,
    HomeEventsComponent,
    HomeServiceComponent,
    HomeAboutUsComponent,
    ClientBacKOfficeComponent,
    ClientHomePageComponent,
    HomeCoursByCategoryComponent,
    HomeCoursBusinessComponent,
    CardsLineComponent,
    ItemDetailsComponent,
    PayementDisplayComponent,
    ClientPayementDisplayComponent,
    ClientqrCodeComponent,
    PayementEventsComponent,
    ClientMessagerieComponent,
    MessagerieComponent,
    SafePipe,
    PromotionComponent,
    AddPromotionComponent,
    AdminBackOfficeComponent,
    UserDisplayComponent,
    AdminHomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMenuModule,
    NzButtonModule,
    NzDropDownModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzInputModule,
    NzDatePickerModule,
    NzIconModule,
    NzDividerModule,
    NzTypographyModule,
    NzUploadModule,
    NzMessageModule,
    NzSpinModule,
    CloudinaryModule.forRoot(Cloudinary,
      {
        cloud_name: 'dgdsoqyok',
        api_key: '859365487398468',
        api_secret: 'y0KthOyrj9SSMqTJSOJHVoes0ts',
      }),
    NzCollapseModule,
    NzToolTipModule,
    NzAlertModule,
    NzNotificationModule,
    NzCardModule,
    NzModalModule,
    FormsModule,
    NzResultModule,
    NzAvatarModule,
    NzEmptyModule,
    NzTagModule,
    NzSelectModule],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    UploadServiceService,
    EntityMapperService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
