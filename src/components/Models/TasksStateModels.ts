import { TaskModel } from "./TaksModel";

export type TasksStateModels ={
  tasks: TaskModel[];
  secondsRemaining:number;
  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number;
  config:{
    workTime:number,
    shortBreakTime:number;
    longBreakTime:number;
  };
};