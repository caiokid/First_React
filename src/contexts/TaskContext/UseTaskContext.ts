import { useContext } from "react";
import { TaskContext } from "./TaskContent";

export function useTaskcontext(){
    return useContext(TaskContext);
}