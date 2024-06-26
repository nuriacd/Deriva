import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ROLES } from './roles';
import { authGuard } from './utils/auth.guard';
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
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact-page', component: ContactPageComponent},
  {path: 'work-with-us', component: WorkWithUsComponent},
  {path: 'menu/:type', component: MenuComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'use-conditions', component: UseConditionsComponent},
  {path: 'purchase-conditions', component: PurchaseConditionsComponent},
  {path: 'cookies', component: CookiesComponent},
  {path: '404', component: NotFoundComponent},

  {path: 'my-orders', canActivate: [authGuard], data: { roles: [ROLES.USER] }, component: MyOrdersComponent},
  {path: 'check-out', canActivate: [authGuard], data: { roles: [ROLES.USER] }, component: CheckOutComponent},
  {path: 'my-data', canActivate: [authGuard], data: { roles: [ROLES.USER] }, component: MyOrdersComponent},
  {path: 'shopping-cart', canActivate: [authGuard], data: { roles: [ROLES.USER] }, component: ShoppingCartComponent},

  {path: 'employee-area', canActivate: [authGuard], data: { roles: [ROLES.EMPLOYEE] }, component: EmployeeAreaComponent},
  {path: 'stock', canActivate: [authGuard], data: { roles: [ROLES.EMPLOYEE] }, component: StockComponent},
  
  {path: 'admin-panel', canActivate: [authGuard], data: { roles: [ROLES.ADMIN] }, component: AdminPanelComponent},
  
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
