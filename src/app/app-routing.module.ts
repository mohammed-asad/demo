import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { GuardGuard } from '../app/guard.guard';;
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', component:HomeComponent,
  canActivate: [GuardGuard]
},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent,
  canActivate: [GuardGuard],
},
  {path:'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
