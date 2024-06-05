'use client';

import { TodoClient, TodoService } from '@/client/todo';
import { TodoStatus, todoStatuses } from '@/data/todoStatus';
import { TodoContext } from '@/providers/todo.provider';
import { TodoType } from '@/types/todo/todo.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardEvent, memo, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const todoForm = Yup.object().shape({
  content: Yup.string().min(2, 'Too Short').max(35, 'Too Long').required('Required'),
  priority: Yup.number().min(1).max(10).default(1).required('Required'),
  status: Yup.mixed<TodoStatus>().oneOf(Object.values(TodoStatus)).required('Required'),
});

export default memo(
  function Todo({ _id, content, status, priority }: Readonly<TodoType>) {
    const [_content, setContent] = useState(content);
    const [_priority, setPriority] = useState(priority);
    const [_status, setStatus] = useState(status);
    const { setTodos } = useContext(TodoContext);
    const [isSelectedContent, setIsSelectedContent] = useState(false);

    const handleUpdate = async () => {
      try {
        await new TodoClient(
          _content,
          _priority,
          _status,
          _id,
        ).updateOne();
        setTodos(await new TodoService().getAll());
        setIsSelectedContent(false)
      } catch (err) {
        console.log(err);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsSelectedContent(false);
      }
    };

    const handleDeleteOne = async () => {
      await new TodoService().deleteOne(_id);
      setTodos(await new TodoService().getAll());
    };

    return (
      <>
        {!isSelectedContent ?
          (
            <li
              onDoubleClick={() => setIsSelectedContent(true)}
              className=''
              key={_id}
            >
              Task: <b>{content}</b>
            </li>
          )
          :
          (
            <input
              value={_content}
              onKeyDown={handleKeyDown}
              onChange={e => setContent(e.target.value)}
              className='border-2 border-gray-900'
              type='text'
            />
          )

        }
        <select
          value={_status}
          onChange={e => setStatus(e.target.value as TodoStatus)}
          className='text-[red]' defaultValue={status}
        >
          {todoStatuses.map(({ status, title, id }) => (
            <option key={id} value={status}>{title}</option>
          ))}
        </select>

        <input
          value={_priority}
          onChange={e => setPriority(+e.target.value)}
          type="number"
          min={1}
          max={10}
          defaultValue={priority}
          className='border-2 pl-1'
        />

        <button onClick={handleUpdate} className='border-2 px-2'>Update</button>
        <button onClick={handleDeleteOne} className='border-2 px-2'>Delete</button>
      </>
    );
  }
);