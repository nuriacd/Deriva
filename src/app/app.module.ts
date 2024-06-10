import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EmployeeAreaComponent } from './employee-area/employee-area.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { MenuComponent } from './menu/menu.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ProdctAdminTableComponent } from './prodct-admin-table/prodct-admin-table.component';
import { UserAdminTableComponent } from './user-admin-table/user-admin-table.component';
import { EmployeeAdminTableComponent } from './employee-admin-table/employee-admin-table.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { WorkWithUsComponent } from './work-with-us/work-with-us.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookiesComponent } from './cookies/cookies.component';
import { UseConditionsComponent } from './use-conditions/use-conditions.component';
import { PurchaseConditionsComponent } from './purchase-conditions/purchase-conditions.component';
import { MyDataComponent } from './my-data/my-data.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { StockComponent } from './stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    UserPageComponent,
    EmployeeAreaComponent,
    AdminPanelComponent,
    LoginComponent,
    MenuComponent,
    ShoppingCartComponent,
    DeliveryComponent,
    ProdctAdminTableComponent,
    UserAdminTableComponent,
    EmployeeAdminTableComponent,
    MyOrdersComponent,
    ContactPageComponent,
    WorkWithUsComponent,
    PrivacyComponent,
    CookiesComponent,
    UseConditionsComponent,
    PurchaseConditionsComponent,
    MyDataComponent,
    ChangePasswordComponent,
    CheckOutComponent,
    StockComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [
    CookieService,
    { provide: MAT_DIALOG_DATA, useValue:{} },
    { provide: MatDialogRef, useValue:{} },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
