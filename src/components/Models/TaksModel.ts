import { TasksStateModels } from "./TasksStateModels";

export type TaskModel = {
    lenght: number;
    id:string;
    name:string;
    duration:number;
    startDate:number;
    completeDate:number| null;
    interruptDate:number| null;
    type: keyof TasksStateModels['config']; //ESTA ACESSANDO E PEGANDO AS CONFIGS DENTRRO DO OURTO TYPE
};