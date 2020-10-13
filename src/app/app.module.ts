import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpIntercepterService } from './Services/http-intercepter.service';
import { HomeModule } from './home/home.module';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CoordinatorModule } from './coordinator/coordinator.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { WrongRouteComponent } from './wrong-route/wrong-route.component';
@NgModule({
  declarations: [
    AppComponent,
    WrongRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    AdminModule,
    StudentModule,
    CoordinatorModule,
    RouterModule,
    FormsModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
