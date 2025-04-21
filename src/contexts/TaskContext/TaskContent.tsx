import { createContext} from "react";
import { TasksStateModels } from "../../components/Models/TasksStateModels";
import { initialState } from "./initialTaskState";
import { TaskActionModel } from "./taskActions";

type TaskContextProps ={
    state: TasksStateModels,
    dispatch: React.Dispatch<TaskActionModel>,
};


const initialContextValue={
    state: initialState,
    dispatch: () => {},
}
      

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
