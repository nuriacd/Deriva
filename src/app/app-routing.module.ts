import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ROLES } from './roles';
import { authGuard } from './utils/auth.guard';
import { UserPageComponent } from './user-page/user-page.component';
import { EmployeeAreaComponent } from './employee-area/employee-area.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent},

  {path: 'shoppingCart', /*canActivate: [authGuard], data: { roles: [ROLES.USER] }, */component: ShoppingCartComponent},
  {path: 'userPage', /*canActivate: [authGuard], data: { roles: [ROLES.USER] }, */component: UserPageComponent},
  {path: 'employeeArea', /*canActivate: [authGuard], data: { roles: [ROLES.EMPLOYEE, ROLES.ADMIN] }, */component: EmployeeAreaComponent},
  {path: 'adminPanel', /*canActivate: [authGuard], data: { roles: [ROLES.ADMIN] }, */component: AdminPanelComponent},
  
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
