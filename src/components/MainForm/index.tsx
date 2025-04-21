import { useRef } from 'react';
import styles from './Styles.module.css';
import { TaskModel } from '../Models/TaksModel';
import { useTaskcontext } from '../../contexts/TaskContext/UseTaskContext';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { getNextCycle } from '../../utils/getNextCycles';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';



//type MainFormChildren ={
  //  children: React.ReactNode;
//};

export function MainForm(){

  
  const {state,dispatch} = useTaskcontext();

  

  //ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle); 
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  //Tips

  const tipsForWhenActive = {
    workTime: <span>Foque por {state.config.workTime}min</span>,
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,
    longBreakTime:<span>Descanso longo </span>,
  }

  const tipsForNoActive = {
    workTime:(<span>Proximo ciclo é de {state.config.workTime}min</span>),
    shortBreakTime:(<span>Proximo ciclo é de {state.config.shortBreakTime}min</span>),
    longBreakTime:(<span>Próximo descanso será longo</span>),
  }


  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault(); 
    showMessage.dismiss();

      

    if(taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();
    if(!taskName){
      showMessage.warning('Digite o nome da tarefa');
      return;
    }
    const newTask: TaskModel= {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
      lenght: 0
    }

   dispatch({type: TaskActionTypes.START_TASK,payload:newTask});    

   const worker = new Worker(new URL('../../workers/index.js', import.meta.url),)
   worker.postMessage('Opa');
  } 


    
  function handleStopTask(){
    dispatch({type: TaskActionTypes.INTERRUPT_TASK})      
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida');
  }

    return ( 
     <form onSubmit={handleCreateNewTask} action='' className={styles.MainForm}>
        <div className={styles.MainFormRow}>
         <DefaultInput 
         //value={taskName} 
         //onChange={(e)=>setTaskName(e.target.value)} 
         labelText='Task' 
         id='meuInput' 
         type='text' 
         placeholder='Digite algo'
         ref={taskNameInput}
         disabled ={!!state.activeTask}
         defaultValue={lastTaskName}
         ></DefaultInput> 
        </div>


        <div className='formRow'>
           <p>
            {!!state.activeTask &&  tipsForWhenActive[state.activeTask.type]}
            {!state.activeTask &&  tipsForNoActive [nextCycleType]}
           </p> 
        </div>
         
        {state.currentCycle > 0 ?(
        <div className='formRow'>
        <Cycles />
        </div>
        ):''}

        <div className='formRow'>
        {!state.activeTask &&(<DefaultButton aria-label='Começar uma tarefa' title='Começar uma tarefa'  type='submit'  icon={<PlayCircleIcon />}  color='green' key='Botao de submit'/>)} 
      
        {!!state.activeTask  &&(<DefaultButton aria-label='Interromper tarefa' title='Interromper tarefa'  type='button' icon={<PlayCircleIcon />} color='red' onClick={handleStopTask}  key='Botao de parar'/>) }
        </div>
      </form>
    ) 
}
