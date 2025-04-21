import { SaveIcon } from "lucide-react"
import { Container } from "../../components/Container"
import { DefaultInput } from "../../components/DefaultInput"
import { Heading } from "../../components/Heading"
import MainTemplate from "../../components/templates/MainTemplates"
import { DefaultButton } from "../../components/DefaultButton"
import { useRef } from "react"
import { useTaskcontext } from "../../contexts/TaskContext/UseTaskContext"
import { showMessage } from "../../adapters/showMessage"
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions"


export function Settings(){
  const {state, dispatch} = useTaskcontext();

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event:React.FormEvent<HTMLFormElement>){
   event.preventDefault();
   showMessage.dismiss();
     
     const formErrors = [];

    const workTime= Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if(isNaN(workTime || shortBreakTime|| longBreakTime )){
      formErrors.push('Preencha todos os campos apenas com números');
    }

    if(workTime < 1 || workTime > 99){
      formErrors.push('Os valores entre 1 e 99 para foco');
    }
    if(shortBreakTime < 1 || shortBreakTime > 30){
      formErrors.push('Os valores entre 1 e 30 para descanso curto');
    }

    if(longBreakTime  < 1 || longBreakTime  > 60){
      formErrors.push('Os valores entre 1 e 60 para descanso longo');
    }

    if(formErrors.length > 0){
      formErrors.forEach((error) => {
        showMessage.error(error);
      });
      return;
    } 

  dispatch({type: TaskActionTypes.CHANGE_SETTINGS, payload:{workTime,shortBreakTime,longBreakTime}})
 
  showMessage.success('Configurações salvas com sucesso!');
         

    //if(workTimeValue && shortBreakTimeValue && longBreakTimeValue){
      //localStorage.setItem('workTime', workTimeValue);
     // localStorage.setItem('shortBreakTime', shortBreakTimeValue);
    //  localStorage.setItem('longBreakTime', longBreakTimeValue);
   // }
    //alert("Configurações Salvas com sucesso!")
    //workTime.current!.value = '';
  }
  return (
      <MainTemplate>

        <Container>
          <Heading>
          Configurações   
          </Heading> 
        </Container> 
        
              
        <Container>
        <p style={{textAlign:'center'}}>
          Modifique as configurações para tempo de foco, desncaso curto e descanso longo. 
        </p>
        </Container>

        <Container>
          <form onSubmit={handleSaveSettings} action="" className="form">

            <div className="formRow">
              <DefaultInput id='workTime' ref={workTimeInput} labelText='Foco'  defaultValue={state.config.workTime}/>
            </div>
            <div className="formRow">
              <DefaultInput id='shortBreakTime' ref={shortBreakTimeInput} labelText='Descanso' defaultValue={state.config.shortBreakTime}  />
            </div>
            <div className="formRow">
              <DefaultInput id='longBreakTime' ref={longBreakTimeInput } labelText='Descanso Longo'  defaultValue={state.config.longBreakTime} />
            </div>
            <div className="formRow">
              <DefaultButton icon={<SaveIcon />} arial-label='Salvar Configurações' title='Salvar Configurações'/>
            </div>
          </form>
        </Container>

      </MainTemplate>
  )
}
