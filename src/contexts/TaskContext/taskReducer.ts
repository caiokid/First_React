import { TaskActionModel, TaskActionTypes } from './taskActions';
import { TasksStateModels } from '../../components/Models/TasksStateModels';
import { getNextCycle } from '../../utils/getNextCycles';
import { formtSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { initialState } from './initialTaskState';


 export function taskReducer(state: TasksStateModels,action: TaskActionModel,): TasksStateModels{
   switch (action.type) {
     case TaskActionTypes.START_TASK: {

     const newTask = action.payload;
     const nextCycle = getNextCycle(state.currentCycle);
     const secondsRemaining = newTask.duration * 60;

      return {
       ...state,
       activeTask:newTask,
       currentCycle:nextCycle,
       secondsRemaining,
       formattedSecondsRemaining:formtSecondsToMinutes(secondsRemaining),
       tasks: [...state.tasks, newTask],
      };
     }


     case TaskActionTypes.INTERRUPT_TASK:{     
       return {
        ...state,
        activeTask:null,
        secondsRemaining:0,
        formattedSecondsRemaining:'00:00',
        tasks: state.tasks.map(task => {
        if(state.activeTask && state.activeTask.id === task.id){
          return {...task, interruptDate: Date.now()};  
        }
          return task;
        })
      };
     }


     case TaskActionTypes.RESET_STATE: {
       return {...initialState};
     }
     
    
     case TaskActionTypes.COUNT_DOWN: {
      
      if ('payload' in action && action.payload?.secondsRemaining !== undefined) {
        return {
          ...state,
          secondsRemaining: action.payload.secondsRemaining,
          formattedSecondsRemaining: formtSecondsToMinutes(action.payload.secondsRemaining),
        };
      }
      return state;
    }

    case TaskActionTypes.COMPLETE_TASK: {     
      return {
       ...state,
       activeTask:null,
       secondsRemaining:0,
       formattedSecondsRemaining:'00:00',
       tasks: state.tasks.map(task => {
       if(state.activeTask && state.activeTask.id === task.id){
         return {...task, completeDate: Date.now()};  
       }
         return task;
       })
     };
    }

    case TaskActionTypes.CHANGE_SETTINGS: {
      return{...state, config:{ ...action.payload}};
    }



 
   // Sempre deve retornar o estado
   return state;
 }
}