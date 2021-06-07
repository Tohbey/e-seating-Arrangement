import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { CoordinatorComponent } from './coordinator.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GraphicalViewComponent } from './graphical-view/graphical-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TableComponent } from './table/table.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { WorkPostComponent } from './work-post/work-post.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    CoordinatorComponent,
    AttendanceComponent,
    GraphicalViewComponent,
    NavbarComponent,
    ProfileComponent,
    StudentListComponent,
    TableComponent,
    TimeTableComponent,
    WorkPostComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule.forRoot()
  ],
  exports:[
    CoordinatorComponent,
    AttendanceComponent,
    GraphicalViewComponent,
    NavbarComponent,
    ProfileComponent,
    StudentListComponent,
    TableComponent,
    TimeTableComponent,
    WorkPostComponent,
    ToolbarComponent
  ]
})
export class CoordinatorModule { }
