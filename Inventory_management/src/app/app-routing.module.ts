import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemUpdateComponent } from './items/item-update/item-update.component';
import { ItemsComponent } from './items/items.component';
import { StockAddComponent } from './stocks/stock-add/stock-add.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { StockUpdateComponent } from './stocks/stock-update/stock-update.component';
import { StocksComponent } from './stocks/stocks.component';
import { StoreListComponent } from './store/store-list/store-list.component';
import { StoreAddComponent } from './store/store-add/store-add.component';
import { StoreComponent } from './store/store.component';
import { StoreUpdateComponent } from './store/store-update/store-update.component';

const routes: Routes = [
  {
    path: 'items',
    component: ItemsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: ItemListComponent },
      { path: 'add', component: ItemAddComponent },
      { path: 'update/:id', component: ItemUpdateComponent },
    ],
  },
  {
    path: 'stocks',
    component: StocksComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: StockListComponent },
      { path: 'add', component: StockAddComponent },
      { path: 'update/:id', component: StockUpdateComponent },
    ],
  },
  {
    path: 'store',
    component: StoreComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: StoreListComponent },
      { path: 'add', component: StoreAddComponent },
      { path: 'update/:id', component: StoreUpdateComponent},
    ],
  },
 
  { path: '',  component:LoginComponent},
  { path:'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
