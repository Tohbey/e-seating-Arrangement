import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { AuthGraudService } from './Services/routing-service/auth-graud.service';
import { StudentComponent } from './student/student.component';
import { WrongRouteComponent } from './wrong-route/wrong-route.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:''},
  {path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [AuthGraudService],
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'coordinator',
    component: CoordinatorComponent, canActivate: [AuthGraudService],
    children: [
      {
        path: '',
        loadChildren: () => import('./coordinator/coordinator.module').then(m => m.CoordinatorModule)
      }
    ]
  },
  {
    path: 'student',
    component: StudentComponent, canActivate: [AuthGraudService],
      children: [
        {
          path: '',
          loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
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
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
