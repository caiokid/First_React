import { TasksStateModels } from "../../components/Models/TasksStateModels";

export const initialState: TasksStateModels = {
  tasks:[],
    secondsRemaining:0,
    formattedSecondsRemaining: '00:00',
    activeTask: null,
    currentCycle: 0,
    config:{
      workTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
    },
};