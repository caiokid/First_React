import { TaskModel } from "../components/Models/TaksModel";

export function getTaskStatus(task:TaskModel, activeTask: TaskModel | null){

    if(task.completeDate) return 'Concluída';
    if(task.interruptDate) return 'Interrompida';
    if(task.id === activeTask?.id) return 'Em andamento';

    return 'Abandonada';
}