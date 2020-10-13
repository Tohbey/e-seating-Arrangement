import { ExamSeat } from './examSeat';
import { ExamSession } from './examSession';

export class Hall{
  id:number
  hallId:number;
  hallName:string;
  hallSize:number;
  department:String;
  hallRow:String;
  hallColumn:String;
  hallMainCoordinator:String;
  hallAssistanceCoordinator:String;
  rowSection:number;
  hallSessions:ExamSession[];
  allocatedSize:number;
}
