import styles from './Styles.module.css';


type DeafaultInputProps={
    id:string;
    labelText: string;
} & React.ComponentProps<'input'>;


export function DefaultInput({id,type,labelText, ...rest} :DeafaultInputProps){   
    return (
    <>
        {labelText && <label htmlFor={id}>{labelText}</label>}
        <input className={styles.input} id={id} type={type} {...rest} />
    </>
    )
}