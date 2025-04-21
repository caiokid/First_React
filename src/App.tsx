import './styles/global.css';
import './styles/theme.css';
import { TaskContexProvider } from './contexts/TaskContext/TaskContextProvider.tsx';
import { MessagesContainer } from './components/MessagesContainer/index.tsx';
import {MainRouter} from './routers/MainRouter/index.tsx';

function App(){   
  return (
    
  <TaskContexProvider >
    <MessagesContainer>

    <MainRouter />

    </MessagesContainer>
  </TaskContexProvider > 
  
)
}


export default App