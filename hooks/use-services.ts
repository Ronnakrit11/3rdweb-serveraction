'use client';

import useSWR from 'swr';
import type { Service } from '@/app/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useServices() {
  const { data, error, isLoading } = useSWR<Service[]>('/api/services', fetcher);

  return {
    services: data,
    isLoading,
    isError: error,
  };
}