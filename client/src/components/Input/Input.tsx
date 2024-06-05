'use client';

import { TodoClient, TodoService } from '@/client/todo';
import { TodoStatus, todoStatuses } from '@/data/todoStatus';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TodoContext } from '@/providers/todo.provider';
import { useContext } from 'react';

const todoForm = Yup.object().shape({
  content: Yup.string().min(2, 'Too Short').max(35, 'Too Long').required('Required'),
  priority: Yup.number().min(1).max(10).default(1).required('Required'),
  status: Yup.mixed<TodoStatus>().oneOf(Object.values(TodoStatus)).required('Required'),
});

export default function Input() {
  const { setTodos } = useContext(TodoContext);
  const router = useRouter();
  const pathname = usePathname();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(todoForm),
  });

  const submitHandle = async (data: any) => {
    const {content, priority, status} = data;

    await new TodoClient(
      content,
      priority,
      status,
    ).createOne();
    reset();
    setTodos(await new TodoService().getAll())
  };

  return (
    <article>
      <form className='flex flex-col gap-8 border-2 border-gray-800 bg-gray-50 py-8 px-4 rounded-lg' onSubmit={handleSubmit(submitHandle)}>
        <label htmlFor='input-content' className='relative'>
          <span className='absolute text-sm text-gray-500 bottom top-[-1.25rem]'>Title</span>
          <input
            {...register('content')}
            id='input-content'
            minLength={5}
            className='border-2 border-stone-800 rounded-md w-full p-4 '
            type='text'
            placeholder='Write here your task'
          />
          {errors.content && <p>{errors.content.message}</p>}
        </label>
        <label htmlFor='input-priority' className='relative flex'>
          <span className='absolute text-sm text-gray-500 bottom top-[-1.25rem]'>
            Priority
          </span>

          <input
            {...register('priority')}
            id='input-priority'
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            className='border-2 border-stone-800 p-2 rounded-md h-min '
          />
          {errors.priority && <p>{errors.priority.message}</p>}
        </label>
        <label htmlFor='input-status' className='relative'>
          <span className='absolute text-sm text-gray-500 bottom top-[-1.25rem]'>
            Status
          </span>

          <select {...register('status')} id='input-status' className='w-full border-2 border-stone-800 py-2 px-1 rounded-md' defaultValue="">
            <option value="" disabled>Select your status</option>
            {todoStatuses.map(({ id, status, title }) => (
              <option value={status} key={id}>{title}</option>
            ))}
          </select>
          {errors.status && <p>{errors.status.message}</p>}
        </label>
        <button className='border-2 border-stone-800 py-2 px-1 rounded-md bg-white'>Create</button>
      </form>

    </article>
  );
}