import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand//brand.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { RentComponent } from './components/rent/rent.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';

import { ToastrModule} from "ngx-toastr";
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { DisplacementComponent } from './components/displacement/displacement.component';
import { DisplacementFilterPipe } from './pipes/displacement-filter.pipe';
import { DisplacementAddComponent } from './components/displacement-add/displacement-add.component';
import { DisplacementUpdateComponent } from './components/displacement-update/displacement-update.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { ImageUpdateComponent } from './components/image-update/image-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserPwUpdateComponent } from './components/user-pw-update/user-pw-update.component';
import { UserNameUpdateComponent } from './components/user-name-update/user-name-update.component';
import { UserEmailUpdateComponent } from './components/user-email-update/user-email-update.component';
import { OperationClaimsComponent } from './components/operation-claims/operation-claims.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { CarAdminComponent } from './components/car-admin/car-admin.component';
import { BrandAdminComponent } from './components/brand-admin/brand-admin.component';
import { DisplacementAdminComponent } from './components/displacement-admin/displacement-admin.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CarComponent,
    CustomerComponent,
    RentalComponent,
    NavbarComponent,
    CardetailComponent,
    CarImageComponent,
    CarFilterPipe,
    BrandFilterPipe,
    RentComponent,
    PaymentComponent,
    CarAddComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    DisplacementComponent,
    DisplacementFilterPipe,
    DisplacementAddComponent,
    DisplacementUpdateComponent,
    CarUpdateComponent,
    ImageAddComponent,
    ImageUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailComponent,
    UserPwUpdateComponent,
    UserNameUpdateComponent,
    UserEmailUpdateComponent,
    OperationClaimsComponent,
    OrderByPipe,
    AdminComponent,
    CarAdminComponent,
    BrandAdminComponent,
    DisplacementAdminComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    SlickCarouselModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
