import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGraudService } from './Services/routing-service/auth-graud.service';
import { WrongRouteComponent } from './wrong-route/wrong-route.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:''},
  {path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule'
      }
    ]
  },
  //wild card route
  {path:'**',pathMatch:'full', component:WrongRouteComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
