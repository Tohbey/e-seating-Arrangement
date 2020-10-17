import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { CourseComponent } from './course/course.component';
import { SeatComponent } from './seat/seat.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'time-table'},
  {path: 'time-table', component: TimeTableComponent},
  {path:'courses',component:CourseComponent},
  {path: 'seat', component: SeatComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
