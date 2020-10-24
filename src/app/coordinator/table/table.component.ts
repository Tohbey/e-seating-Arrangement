import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/Services/courseService/course.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  examDate:string;
  @Input() week:string
  morningPaper:any[];
  afternoonPaper:any[];
  eveningPaper:any[];
  examDates:String[];
  constructor(private courseService:CourseService) { }
  exams:any[]=[]
  showTable:boolean[];


  ngOnInit(){
    // this.GetExamDates();
  }
  ngOnChanges() {
    this.GetExamDates(this.week);
    // if(this.examDate != null){
    //   this.getExams(this.examDate,'9am-12noon')
    //   this.getExams(this.examDate,'12noon-3pm')
    //   this.getExams(this.examDate,'3pm-6pm')
    // }
  }
  getTable(i){
    console.log(i);
    let index = this.examDates.findIndex(dates => dates === i )
    console.log(index)
    this.showTable[i]=!this.showTable[i];
  }
  returnFalse(length){
    for(let i=0;i<length;i++){
      this.showTable[i] = false
    }
  }
  GetExamDates(week){
    let resp = this.courseService.getExamdates(week);
    resp.subscribe((data) => {
      this.examDates = data;
      this.showTable = new Array(this.examDates.length)
      this.returnFalse(this.showTable.length)
      console.log(this.showTable)
    })
    return this.examDates
  }

  getExams(date,time){
    let resp = this.courseService.getCOursesByExamTime(date,time);
    resp.subscribe((data) => {
      switch (time){
        case '9am-12noon':
          this.morningPaper = data
          console.log(this.morningPaper)
          break;
        case '12noon-3pm':
          this.afternoonPaper = data;
          console.log(this.afternoonPaper)
          break;
        case '3pm-6pm':
          this.eveningPaper = data;
          console.log(this.eveningPaper)
          break;
        default:
          console.log("no time")
      }
      this.exams = [
        {
          morningPaper: this.morningPaper,
          afternoonPaper: this.afternoonPaper,
          eveningPaper: this.eveningPaper,
        }
      ];
    })
  }
}
