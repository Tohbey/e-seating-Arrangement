import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HallComponent } from './hall/hall.component';
import { ProfileComponent } from './profile/profile.component';
import { TableComponent } from './table/table.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatProgressBarModule } from '@angular/material';
@NgModule({
  declarations: [
    AdminComponent,
    HallComponent,
    ProfileComponent,
    TableComponent,
    TimeTableComponent,
    CoordinatorComponent,
    UserAccessComponent,
    NavbarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    NgxPaginationModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule.forRoot()
  ],
  exports:[
    AdminComponent,
    HallComponent,
    ProfileComponent,
    TableComponent,
    TimeTableComponent,
    CoordinatorComponent,
    UserAccessComponent,
    NavbarComponent
  ]
})
export class AdminModule { }
