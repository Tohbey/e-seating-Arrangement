import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SeatComponent } from './seat/seat.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    StudentComponent,
    CourseComponent,
    NavbarComponent,
    ProfileComponent,
    SeatComponent,
    TimeTableComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FontAwesomeModule,
  ],
  exports:[
    StudentComponent,
    CourseComponent,
    NavbarComponent,
    ProfileComponent,
    SeatComponent,
    TimeTableComponent,
    ToolbarComponent
  ]
})
export class StudentModule { }
