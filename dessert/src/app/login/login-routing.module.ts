import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  // {
  // path: "register",
  // component: RegisterComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
