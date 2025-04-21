import styles from './Styles.module.css';
import { useTaskcontext } from '../../contexts/TaskContext/UseTaskContext';
export function Countdown(){
   
    const {state} = useTaskcontext();

    return <div className={styles.container}>{state.formattedSecondsRemaining}</div>
    
}