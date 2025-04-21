import { useEffect, useReducer, useRef } from "react";
import { initialState } from "./initialTaskState";
import { TaskContext } from "./TaskContent";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loudBeep";
import { TasksStateModels } from "../../components/Models/TasksStateModels";

type TaskContextProviderProps = {
  children: React.ReactNode;
}

export function TaskContexProvider({children}: TaskContextProviderProps){
  const [state, dispatch] = useReducer(taskReducer,initialState, ()=>{
    const storageState = localStorage.getItem('state') || null; 
    
    if(storageState === null)  return initialState;

    const parsedStorage = JSON.parse(storageState) as TasksStateModels;


    return {
      ...parsedStorage,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    }
    ;
  });


  const playBeepRef = useRef<ReturnType<typeof loadBeep>|null>(null);

  const worker = TimerWorkerManager.getInstance();
  worker.onmessage(e =>{
    const countDownSeconds = e.data;
    console.log(countDownSeconds);
    
    if(countDownSeconds <= 0){
      if(playBeepRef.current){
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({type:TaskActionTypes.COMPLETE_TASK}); 
      worker.terminate();
    }else{
      dispatch({type:TaskActionTypes.COUNT_DOWN, payload:{secondsRemaining:countDownSeconds}})
    }

    if(countDownSeconds <= 0){
      console.log('Worker Complete');
      worker.terminate();
    }
  });

  useEffect(()=>{  
    localStorage.setItem('state', JSON.stringify(state));

    if(!state.activeTask){
      console.log('Worker terminado por falta de activeTask');
      worker.terminate();
      document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    }             
    worker.postMessage(state);
  },[worker, state]);
  

  useEffect(()=>{  
    if(state.activeTask){
      console.log('Nova Task');
      playBeepRef.current = loadBeep();
      document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    }else{
      playBeepRef.current = null;
    }             
    worker.postMessage(state);
  },[worker, state]);


    return(
      <TaskContext.Provider value={{state,dispatch}}>
        {children}
      </TaskContext.Provider>
    );
}
