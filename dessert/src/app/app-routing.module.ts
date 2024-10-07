import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ForgetPwdComponent } from './login/forget-pwd/forget-pwd.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { InformComponent } from './check-out/inform/inform.component';
import { ConfirmOrderComponent } from './check-out/confirm-order/confirm-order.component';
import { MyOrderComponent } from './my-order/my-order.component';
const routes: Routes = [
  {
    path: "home",//用來顯示在http的url上，意思是看到這個path會呼叫這個component
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path:"product",
    component:ProductComponent,
  },
  {
    path:"forgetPwd",
    component:ForgetPwdComponent,
  },
  {
    path: 'check-out', component: CheckOutComponent
  },
  {
    path:'inform',component:InformComponent
  },
  {
    path:'confirm-order',component:ConfirmOrderComponent
  },
  {
    path:'my-order',component:MyOrderComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
