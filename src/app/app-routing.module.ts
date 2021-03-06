import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandAdminComponent } from './components/brand-admin/brand-admin.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarAdminComponent } from './components/car-admin/car-admin.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { DisplacementAddComponent } from './components/displacement-add/displacement-add.component';
import { DisplacementAdminComponent } from './components/displacement-admin/displacement-admin.component';
import { DisplacementUpdateComponent } from './components/displacement-update/displacement-update.component';
import { DisplacementComponent } from './components/displacement/displacement.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { ImageUpdateComponent } from './components/image-update/image-update.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { OperationClaimsComponent } from './components/operation-claims/operation-claims.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEmailUpdateComponent } from './components/user-email-update/user-email-update.component';
import { UserNameUpdateComponent } from './components/user-name-update/user-name-update.component';
import { UserPwUpdateComponent } from './components/user-pw-update/user-pw-update.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:MainPageComponent},
  {path:"cars", component:MainPageComponent},
  {path:"cars/brand/:brandId", component:MainPageComponent},
  {path:"cars/detail/:id", component:CardetailComponent},
  {path:"cars/add", component:CarAddComponent, canActivate:[AdminGuard]},
  {path:"cars/update/:id", component:CarUpdateComponent, canActivate:[AdminGuard]},
  {path:"brands/add", component:BrandAddComponent, canActivate:[AdminGuard]},
  {path:"brands/update/:id", component:BrandUpdateComponent, canActivate:[AdminGuard]},
  {path:"cars/displacement/:displacementId", component:MainPageComponent},
  {path:"displacements/add", component:DisplacementAddComponent, canActivate:[AdminGuard]},
  {path:"displacements/update/:id", component:DisplacementUpdateComponent, canActivate:[AdminGuard]},
  {path:"cars/images/add/:id", component:ImageAddComponent, canActivate:[AdminGuard]},
  {path:"cars/images/update/:id", component:ImageUpdateComponent, canActivate:[AdminGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"user/:id", component:UserDetailComponent, canActivate:[LoginGuard]},
  {path:"user/update/name", component:UserNameUpdateComponent, canActivate:[LoginGuard]},
  {path:"user/update/pw", component:UserPwUpdateComponent, canActivate:[LoginGuard]},
  {path:"user/update/email", component:UserEmailUpdateComponent, canActivate:[LoginGuard]},
  {path:"admin/authentications", component:OperationClaimsComponent, canActivate:[AdminGuard]},
  {path:"admin", component:AdminComponent, canActivate:[AdminGuard]},
  {path:"admin/cars", component:CarAdminComponent, canActivate:[AdminGuard]},
  {path:"admin/brands", component:BrandAdminComponent, canActivate:[AdminGuard]},
  {path:"admin/displacements", component:DisplacementAdminComponent, canActivate:[AdminGuard]},
  {path:"admin/rentals", component:RentalComponent, canActivate:[AdminGuard]}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
