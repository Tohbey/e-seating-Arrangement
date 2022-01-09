import { ExamSeat } from './examSeat';
import { ExamSession } from './examSession';

export class Hall{
  id:number
  hallName:string;
  hallSize:number;
  department:String;
  hallRow:number;
  hallColumn:number;
  hallMainCoordinator:String;
  hallAssistanceCoordinator:String;
  rowSection:number;
  faculty:String;
  mode:String;
  hallSessions:ExamSession[];
  allocatedSize:number;
}
