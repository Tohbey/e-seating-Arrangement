import { Component, Input, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exams';
import { CourseService } from 'src/app/Services/courseService/course.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() week: string;
  morningPaper: any[];
  afternoonPaper: any[];
  eveningPaper: any[];
  examDates: String[];
  exams: any[] = [];
  isloading:boolean[];
  constructor(private courseService: CourseService) { }
  showTable: boolean[];

  ngOnInit(){
  }
  ngOnChanges() {
    this.GetExamDates(this.week);
  }
  getTable(examdate){
    let index = this.examDates.findIndex(dates => dates === examdate )
    console.log(index, this.exams)
    this.showTable[index]=!this.showTable[index];
    console.log('exam Date,', this.examDates[index]);
    console.log(this.examDates[index]);
    this.getExams(this.examDates[index], '9am-12noon',index);
    this.getExams(this.examDates[index], '12noon-3pm',index);
    this.getExams(this.examDates[index], '3pm-6pm', index);
    this.isloading[index] = true;
    console.log(this.exams);
  }

  returnFalse(length){
    for(let i=0;i<length;i++){
      this.showTable[i] = false
    }
  }

  returnObject(length) {
    this.isloading = new Array(length);
    for (let i = 0; i < length; i++) {
      this.exams[i] = new Exam();
      this.isloading[i] = false
    }
  }
  GetExamDates(week){
    let resp = this.courseService.getExamdates(week);
    resp.subscribe((data) => {
      this.examDates = data;
      this.showTable = new Array(this.examDates.length);
      this.exams = new Array(this.examDates.length);
      this.returnFalse(this.showTable.length);
      this.returnObject(this.exams.length);
      console.log(this.exams);
      console.log(this.showTable);
    })
    return this.examDates
  }

  getExams(date, time, i) {
    const resp = this.courseService.getCOursesByExamTime(date, time);
    resp.subscribe((data) => {
      switch (time) {
        case '9am-12noon':
          this.morningPaper = data;
          this.exams[i].morningPaper = this.morningPaper;
          break;
        case '12noon-3pm':
          this.afternoonPaper = data;
          this.exams[i].afternoonPaper = this.afternoonPaper;
          break;
        case '3pm-6pm':
          this.eveningPaper = data;
          this.exams[i].eveningPaper = this.eveningPaper;
          break;
        default:
          console.log('no time');
      }
    });
  }
}
