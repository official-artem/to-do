import { TodoType } from '@/types/todo/todo.type';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

interface DataContextType {
  todos: TodoType[],
  setTodos: Dispatch<SetStateAction<TodoType[]>>
}

export const TodoContext = createContext<DataContextType>({
todos: [],
  setTodos: () => {}
});

export const TodoProvider = ({ children }: { children: ReactNode}) => {
  const [todos, setTodos] = useState<TodoType[]>([])



  const value = useMemo(() => ({
    todos,
    setTodos,
}), [todos])

  return (
    <TodoContext.Provider value={value} >
    {children}
  </TodoContext.Provider>
  )
};

export const useData = () => {
  return useContext(TodoContext);
}