import styles from './Styles.module.css';
import { RouterLink } from '../RouterLink';


export function Footer(){
    return(
        <footer className={styles.footer}>
            <RouterLink href='/about-pomodoro/'>Entendendo os entendedores</RouterLink>
            <RouterLink href='/'>
                Chronos &copy; {new Date().getFullYear()} - Feito com  
            </RouterLink>
        </footer>
    )
}