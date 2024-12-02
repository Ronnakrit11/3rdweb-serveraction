'use client';

import useSWR from 'swr';
import type { Customer } from '@/app/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCustomers() {
  const { data, error, isLoading } = useSWR<Customer[]>('/api/customers', fetcher);

  return {
    customers: data,
    isLoading,
    isError: error,
  };
}