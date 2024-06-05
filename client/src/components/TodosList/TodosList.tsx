'use client';

import { TodoService } from '@/client/todo';
import { TodoType } from '@/types/todo/todo.type';
import { useContext, useEffect, useState } from 'react';
import Todo from '../Todo/Todo';
import { useSearchParams } from 'next/navigation';
import { TodoContext } from '@/providers/todo.provider';
import { sortAndFilterTodos } from '@/helpers/SortAndFilterTodos';
import { TodoStatus } from '@/data/todoStatus';
import { Sort } from '../Filtering/Filter';

export default function TodosList() {
  const { todos, setTodos } = useContext(TodoContext);
  const searchParams = useSearchParams();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect((
  ) => {
    const fetchTodos = async () => {
      try {
        const params = new URLSearchParams(searchParams.toString());
        const sort = params.get('sort') as Sort;
        const filter = params.get('filter') as TodoStatus;
        let todos = await new TodoService().getAll();

        if (filter) {
          todos = new sortAndFilterTodos(todos).filter(filter);
        }
        todos = new sortAndFilterTodos(todos).sort(sort);

        setTodos(todos);
      } catch (err: any) {
        setError('Smt went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {todos.map((
        {
          _id,
          content,
          priority,
          status
        }) => (
        <ul className='w-full flex justify-between mt-4' key={_id}>
          <Todo
            key={_id}
            _id={_id}
            content={content}
            priority={priority}
            status={status}
          />
        </ul>
      ))}
    </div>
  );
}