import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InventoryGridComponent } from './shared/inventory-grid/inventory-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { ItemsComponent } from './items/items.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemUpdateComponent } from './items/item-update/item-update.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { StockAddComponent } from './stocks/stock-add/stock-add.component';
import { StockUpdateComponent } from './stocks/stock-update/stock-update.component';
import { EditButtonRendererComponent } from './shared/edit-button-renderer/edit-button-renderer.component';
import { DeleteButtonComponent } from './shared/Editbuttonrender.component';
import { StoreComponent } from './store/store.component';
import { StoreListComponent } from './store/store-list/store-list.component';
import { StoreAddComponent } from './store/store-add/store-add.component';

@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    LoginComponent,
    InventoryGridComponent,
    ItemsComponent,
    ItemListComponent,
    ItemAddComponent,
    ItemUpdateComponent,
    StocksComponent,
    StockListComponent,
    StockAddComponent,
    StockUpdateComponent,
    EditButtonRendererComponent,
    DeleteButtonComponent,
    StoreComponent,
    StoreListComponent,
    StoreAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    ,FormsModule
    ,HttpClientModule
    ,ReactiveFormsModule
    ,AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

