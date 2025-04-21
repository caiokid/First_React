import styles from './Styles.module.css';
import { HistoryIcon, HouseIcon, MoonIcon, Settings, SunIcon} from 'lucide-react';
import { useState,useEffect } from 'react';
import { RouterLink } from '../RouterLink';

type AvaliableThemes = 'dark' | 'light';


export function Menu(){

    const [theme,setTheme] = useState<AvaliableThemes>(() =>{
        const storageTheme = (localStorage.getItem('theme') as AvaliableThemes) || 'dark';
        return storageTheme;
    });
      
    function handleThemeChange(
        event:React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ){
        event.preventDefault();

        setTheme(prevTheme =>{
            const nextTheme = prevTheme === 'dark'?'light':'dark';
            return nextTheme; 
        })
    }

    const nextThemeIcon = {
        dark:<SunIcon/>,
        light: <MoonIcon/>,
    };

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme',theme);

        return () =>{
            console.log("Será Atualizado");
        }
    }, [theme]);
    
    return (
        <>
        <nav className={styles.menu}>
            <RouterLink aria-label='Ir para Home'title='Ir para Home' className={styles.menuLink} href="/"><HouseIcon /></RouterLink>
            <RouterLink aria-label='Ver Histórico'title='Ver Histórico' className={styles.menuLink} href='/history/'><HistoryIcon /></RouterLink>
            <RouterLink aria-label='Configurações'title='Configurações' className={styles.menuLink} href="/settings/"><Settings /></RouterLink>
            <RouterLink  aria-label='Mudar o Tema' title='Mudar o Tema' className={styles.menuLink} href="#" onClick={handleThemeChange}>{nextThemeIcon[theme]}</RouterLink>
        </nav>
        </>
    )
}