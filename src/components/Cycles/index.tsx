import { useTaskcontext } from '../../contexts/TaskContext/UseTaskContext';
import { getNextCycle } from '../../utils/getNextCycles';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './Styles.module.css';


export function Cycles(){

  const {state} = useTaskcontext();

  const cycleStep = Array.from({length: state.currentCycle});
    
  const cycleDescriptionMap = {
     workTime:'foco',
     shortBreakTime:'descanso curto',
     longBreakTime:'descanso longo',
  }
 
    return(
        <div className={styles.cycles}>
            <span>Ciclos:</span>

            <div className={styles.cycleDots}>
                {cycleStep.map((__, index)=>{
                    const nextCycle = getNextCycle(index);
                    const nextCycleType = getNextCycleType(nextCycle);
                    return(

                     <span key={`${nextCycle}`} className=
                     {`${styles.cycleDot} ${styles[nextCycleType]}`}
                     aria-label={`Indicador de ciclo de foco ${cycleDescriptionMap[nextCycleType]}`}
                     title={cycleDescriptionMap[nextCycleType]}
                     ></span>

                    )
                })}
            
            </div>
        </div>
    )
}