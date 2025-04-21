import styles from './Styles.module.css';
import {TimerIcon} from 'lucide-react';
import { RouterLink } from '../RouterLink';




export function Logo(){


    return <h1 className={styles.logo}> <RouterLink className={styles.logoLink} href="/"> <TimerIcon /> <span>Chronos</span></RouterLink></h1>;
    
}