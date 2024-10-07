import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPwdComponent } from './login/forget-pwd/forget-pwd.component';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { RouterModule, Routes } from '@angular/router';
import { UpdatePasswordComponent } from './login/update-password/updatePassword.component';
import { ProductDescriptionComponent } from './product/product-description/product-description.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { InformComponent } from './check-out/inform/inform.component';
import { ConfirmOrderComponent } from './check-out/confirm-order/confirm-order.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  { path: 'updatePassword', component: UpdatePasswordComponent },
  { path: 'product-description/:id', component: ProductDescriptionComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ForgetPwdComponent,
    UpdatePasswordComponent,
    ProductDescriptionComponent,
    CheckOutComponent,
    InformComponent,
    ConfirmOrderComponent,
    MyOrderComponent
  ],
  imports: [
    // NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    [RouterModule.forRoot(routes)],
    FormsModule
    // BsDropdownModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
