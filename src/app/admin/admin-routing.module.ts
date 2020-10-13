import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { HallComponent } from './hall/hall.component';
import { ProfileComponent } from './profile/profile.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { UserAccessComponent } from './user-access/user-access.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'time-table'},
  {path:'time-table',component:TimeTableComponent},
  {path:'coordinator',component:CoordinatorComponent},
  {path:'hall',component:HallComponent},
  {path:'user-access',component:UserAccessComponent},
  {path:"profile",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
