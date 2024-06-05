'use client';

import FilterAndSort from '@/components/Filtering/Filter';
import Input from '@/components/Input/Input';
import TodosList from '@/components/TodosList/TodosList';
import { TodoProvider } from '@/providers/todo.provider';
import { Suspense } from 'react';

// const name = localStorage.getItem('userName');

export default function Home() {
  return (
    <Suspense>
      <TodoProvider>
        <section className='w-[35vw] mx-auto text-center pt-8'>
          <h1 className='mb-8 text-4xl'>Hello</h1>

          <Input />

          <FilterAndSort />

          <TodosList />
        </section>
      </TodoProvider>
    </Suspense>
  );
}
