import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../admin/profile/profile.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GraphicalViewComponent } from './graphical-view/graphical-view.component';
import { StudentListComponent } from './student-list/student-list.component';
import { WorkPostComponent } from './work-post/work-post.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'time-table'},
  {path:'time-table',component:TimeTableComponent},
  {path:'work-post',component:WorkPostComponent},
  {path:'profile',component:ProfileComponent},
  {path:'attentance',component:AttendanceComponent},
  {path:'attentance/:sessionType',component:AttendanceComponent},
  {path:'student-list',component:StudentListComponent},
  {path:'student-list/:sessionType',component:StudentListComponent},
  {path:'graphical-view',component:GraphicalViewComponent},
  {path:'graphical-view/:sessionType',component:GraphicalViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorRoutingModule { }
