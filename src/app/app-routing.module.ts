import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileItemsComponent } from './mobile-items/mobile-items.component';
import { AddMobileComponent } from './mobile-items/add-mobile/add-mobile.component';
import { MobileItemsListComponent } from './mobile-items/mobile-items-list/mobile-items-list.component';
import { WarrantyComponent } from './mobile-items/warranty/warranty.component';
import { CompaniesComponent } from './mobile-items/companies/companies.component';
import { AccessoryItemsListComponent } from './mobile-items/accessory-items/accessory-items-list/accessory-items-list.component';
import { MobileEditComponent } from './mobile-items/mobile-edit/mobile-edit.component';


const routes: Routes = [
  {
    path: 'mobile-items', component: MobileItemsComponent, children: [

      {
        path: 'warranty',
        component: WarrantyComponent,

      },
      {
        path: 'companies',
        component: CompaniesComponent,

      }

    ]},
    {path: 'add-mobile', component: AddMobileComponent},
    {path: 'list-mobile', component: MobileItemsListComponent},
    {path: 'acc-list/:id', component: AccessoryItemsListComponent},
    {path: 'add-mobile/:id/edit', component: AddMobileComponent},
    {path: 'add-mobile/:id/delete', component: AddMobileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MobileItemsComponent, AddMobileComponent, MobileItemsListComponent];
