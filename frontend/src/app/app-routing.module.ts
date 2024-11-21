import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full' // Standardroute
    },
    {
        path: '**', redirectTo: '/login' // Fallback-Route für ungültige URLs
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }