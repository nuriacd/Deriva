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
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { WorkWithUsComponent } from './work-with-us/work-with-us.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { UseConditionsComponent } from './use-conditions/use-conditions.component';
import { PurchaseConditionsComponent } from './purchase-conditions/purchase-conditions.component';
import { CookiesComponent } from './cookies/cookies.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact-page', component: ContactPageComponent},
  {path: 'work-with-us', component: WorkWithUsComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'my-data', component: MyOrdersComponent},
  {path: 'menu/:type', component: MenuComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'use-conditions', component: UseConditionsComponent},
  {path: 'purchase-conditions', component: PurchaseConditionsComponent},
  {path: 'cookies', component: CookiesComponent},

  {path: 'shopping-cart', /*canActivate: [authGuard], data: { roles: [ROLES.USER] }, */component: ShoppingCartComponent},
  {path: 'user-page', /*canActivate: [authGuard], data: { roles: [ROLES.USER] }, */component: UserPageComponent},
  {path: 'employee-area', /*canActivate: [authGuard], data: { roles: [ROLES.EMPLOYEE, ROLES.ADMIN] }, */component: EmployeeAreaComponent},
  {path: 'stock', /*canActivate: [authGuard], data: { roles: [ROLES.EMPLOYEE, ROLES.ADMIN] }, */component: StockComponent},
  {path: 'admin-panel', /*canActivate: [authGuard], data: { roles: [ROLES.ADMIN] }, */component: AdminPanelComponent},
  
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
