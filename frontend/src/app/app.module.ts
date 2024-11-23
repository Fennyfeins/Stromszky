import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    CustomerSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Angular Material
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
