 import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import MainTemplate from '../../components/templates/MainTemplates';
import styles from './styles.module.css';
import { useTaskcontext } from '../../contexts/TaskContext/UseTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';
 
 export function History() {

  const {state,dispatch} =  useTaskcontext();

  const [sortedTask, setSortTask] = useState<SortTasksOptions>(
    ()=>{
      return{
      tasks: sortTasks({tasks:state.tasks}), 
      field:'startDate',
      direction:'desc',
    }});
   
      useEffect(()=>{
        setSortTask(prevState => ({
          ...prevState,
          tasks:sortTasks({
            tasks:state.tasks,
            direction:prevState.direction,
            field:prevState.field
          }),
        }))},[state.tasks]);

    function handleSortTaks({field}: Pick<SortTasksOptions, 'field'>){
      const newDirection = sortedTask.direction === 'desc' ? 'asc' : 'desc';
  
      setSortTask({
        tasks:sortTasks({
          direction:newDirection,
          tasks:sortedTask.tasks,
          field
        }),
        direction:newDirection,
        field,
     })
    }
    function handleResetHistory(){
      if(!confirm('Você tem certeza que deseja apagar o histórico?')) return

      dispatch({ type:TaskActionTypes.RESET_STATE}); 
    }

     useEffect(() => {
        return () => {
          showMessage.dismiss();
        }   
     });

   return (
     <MainTemplate>
       <Container>
       {state.tasks.length > 0 && state.tasks.length < 100 && ( 
         <Heading>
          <span>History</span>

          <span className={styles.buttonContainer}>
          <DefaultButton onClick={() => handleResetHistory()} className='' icon={<TrashIcon />}    title='Apagar histórico' />
          </span>
          </Heading>
        )}

       </Container>
       <Container>
       {state.tasks.length < 100 && state.tasks.length > 0 &&( 
         <div className={styles.responsiveTable}>
           <table>
             <thead>
               <tr>
                 <th onClick={()=>handleSortTaks({field:'name'})} className={styles.click}>Tarefa</th>
                 <th onClick={()=>handleSortTaks({field:'duration'})} className={styles.click}>Duração</th>
                 <th onClick={()=>handleSortTaks({field:'startDate'})} className={styles.click}>Data</th>
                 <th>Status</th>
                 <th>Tipo</th>
               </tr>
             </thead>
 
             <tbody>
               {sortedTask.tasks.map((task) => {
                  const taskDictionary = {
                    workTime:"foco",
                    shortBreakTime:"descanso",
                    longBreakTime:"descanso longo",
                  }
                      
                  
                 return (
                   <tr key={task.id}>
                     <td>{task.name}</td>
                     <td>{task.duration}min</td>
                     <td>{formatDate(task.startDate)}</td>
                     <td>{getTaskStatus(task, state.activeTask)}</td>
                     <td>{taskDictionary[task.type]}</td>
                   </tr>
                  
                 );
               })}
             </tbody>
           </table>
         </div>
        )}

        {state.tasks.length > 100 &&( 
           
          <Container> 
          <Heading>
          Parece que você ultrapassou o número de tasks
          </Heading>

          </Container> 
        )}
 

       </Container>
     </MainTemplate>
   );
 }


