import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';
import { GridListComponent } from './grid-list/grid-list.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  //{ path: 'table', component: CustomerSearchComponent, canActivate: [AuthGuard] },
  { path: 'table', component: GridListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
