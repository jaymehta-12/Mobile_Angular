import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';




import { MobileItemsService } from './mobile-items/mobile-items.service';
import { AccessoryItemsComponent } from './mobile-items/accessory-items/accessory-items.component';
import { MobileItemsComponent } from './mobile-items/mobile-items.component';
import { MobileItemsListComponent } from './mobile-items/mobile-items-list/mobile-items-list.component';
import { WarrantyComponent } from './mobile-items/warranty/warranty.component';
import { CompaniesComponent } from './mobile-items/companies/companies.component';
import { AccessoryItemsListComponent } from './mobile-items/accessory-items/accessory-items-list/accessory-items-list.component';
import { MobileEditComponent } from './mobile-items/mobile-edit/mobile-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MobileItemsComponent,
    MobileItemsListComponent,
    AccessoryItemsComponent,
    WarrantyComponent,
    CompaniesComponent,
    AccessoryItemsListComponent,
    MobileEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ MobileItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
