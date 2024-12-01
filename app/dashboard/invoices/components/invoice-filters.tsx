"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function InvoiceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Update the URL when filters change
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });
      
      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Debounce search to avoid too many URL updates
  const debouncedSearch = useDebouncedCallback((term) => {
    const queryString = createQueryString({
      search: term || null,
      status: searchParams.get("status") || null,
    });
    router.push(`${pathname}?${queryString}`);
  }, 300);

  const handleSearch = (term: string) => {
    setSearch(term);
    debouncedSearch(term);
  };

  const handleStatusChange = (status: string) => {
    const queryString = createQueryString({
      status: status === "all" ? null : status,
      search: search || null,
    });
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <Input
          placeholder="Search by client name or email..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md"
        />
      </div>
      <Select
        defaultValue={searchParams.get("status") || "all"}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}