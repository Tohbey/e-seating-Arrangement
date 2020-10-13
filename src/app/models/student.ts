import { Courses } from './course';
import { ExamSeat } from './examSeat';
import { Role } from './role';

export class Student{
  id:number;
  matricNumber:String;
  surname:String;
  otherName:String;
  email:String;
  phoneNumber:String;
  faculty:String;
  department:String;
  programme:String;
  level:String;
  courses:Courses[];
  password:String;
  examHall:String;
  examSeat:String;
  studentIsActive:number;
  roles:Role[];
}
