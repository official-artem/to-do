'use client';

import { TodoService } from '@/client/todo';
import { TodoStatus, todoStatuses } from '@/data/todoStatus';
import { TodoContext } from '@/providers/todo.provider';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

export enum Sort {
  ASC = 'asc',
  DESC = 'desc'
}

export default function FilterAndSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [sort, setSort] = useState<string | Sort>('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
      params.set('filter', filter);

    if (sort) {
      params.set('sort', sort);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [sort, filter]);

  return (
    <div className='flex justify-center gap-4'>
      <select onChange={e => setFilter(e.target.value)} className='border-2 p-2 mt-4' name="" id="">
        <option value='all'>All</option>
        {todoStatuses.map(({ title, status, id }) => (
          <option key={id} value={status}>{title}</option>
        ))}
      </select>

      <select
        defaultValue=""
        onChange={e => setSort(e.target.value)}
        value={sort}
        className='border-2 p-2 mt-4'
      >
        <option defaultChecked={true} disabled={true} value="">Sorting</option>
        <option value={Sort.ASC}>ASK</option>
        <option value={Sort.DESC}>DESK</option>
      </select>
    </div>
  );
}