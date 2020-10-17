import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';
import { CourseService } from 'src/app/Services/timetabeService/course.service';
import { TimetableService } from 'src/app/Services/timetabeService/timetable.service';
import { DayService } from 'src/app/Services/dayService/day.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  timetable:any;
  week:string='';
  examDates:String[];
  examWeeks:any;
  date:any;
  show:boolean = false;
  day:Day;
  constructor(
    private timetableService:TimetableService,
    private courseService:CourseService,
    private DayService:DayService

  ) {}

  ngOnInit(){
    this.AllTimetable();
    this.getExamWeeks();
    this.getCurrentDay();
  }

  getCurrentDay(){
    let resp = this.DayService.getCurrentDay();
    resp.subscribe((data) => {
      this.day = data
      console.log(this.day)
    })
    return this.day;
  }

  AllTimetable(){
    let resp = this.timetableService.getAllTimetable();
    resp.subscribe((data) => {
      this.timetable = data;
      console.log("exam time-table",this.timetable)
    })
    return this.timetable;
  }
  getExamWeeks(){
    let resp = this.courseService.getExamWeek();
    resp.subscribe((data) => {
      this.examWeeks = data;
      console.log('exam weeks: ',this.examWeeks)
    })
  }
}
