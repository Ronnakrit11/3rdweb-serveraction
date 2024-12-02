'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Trash2, Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, formatDate } from '@/lib/utils';
import { useCustomers } from '@/hooks/use-customers';
import { useServices } from '@/hooks/use-services';

const invoiceFormSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  dueDate: z.date({
    required_error: 'Due date is required',
  }),
  status: z.enum(['pending', 'paid', 'rejected']),
  items: z.array(z.object({
    serviceId: z.string().min(1, 'Service is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  })).min(1, 'At least one item is required'),
});

export function InvoiceForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { customers, isLoading: isLoadingCustomers } = useCustomers();
  const { services, isLoading: isLoadingServices } = useServices();

  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      status: 'pending',
      items: [{ serviceId: '', quantity: 1 }],
    },
  });

  const onSubmit = useCallback(async (data: z.infer<typeof invoiceFormSchema>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('customerId', data.customerId);
      formData.append('dueDate', data.dueDate.toISOString());
      formData.append('status', data.status);
      formData.append('items', JSON.stringify(data.items));

      const response = await fetch('/api/invoices', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to create invoice');
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Invoice created successfully',
        });

        router.refresh();
        router.push('/dashboard/invoices');
      } else {
        throw new Error('Failed to create invoice');
      }
    } catch (error) {
      console.error('Create invoice error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create invoice',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [router, toast, isSubmitting]);

  const addItem = () => {
    const currentItems = form.getValues('items') || [];
    form.setValue('items', [
      ...currentItems,
      { serviceId: '', quantity: 1 },
    ]);
  };

  const removeItem = (index: number) => {
    const currentItems = form.getValues('items');
    if (currentItems.length > 1) {
      const newItems = [...currentItems];
      newItems.splice(index, 1);
      form.setValue('items', newItems);
    } else {
      toast({
        title: 'Error',
        description: 'Cannot remove the last item. At least one item is required.',
        variant: 'destructive',
      });
    }
  };

  if (isLoadingCustomers || isLoadingServices) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers?.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-8 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Items</h3>
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {form.watch('items').map((_, index) => (
              <div
                key={index}
                className="grid gap-4 sm:grid-cols-[1fr,auto,auto] items-start"
              >
                <FormField
                  control={form.control}
                  name={`items.${index}.serviceId`}
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services?.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} (${service.price})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="number"
                          min="1"
                          className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/invoices')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Invoice'}
          </Button>
        </div>
      </form>
    </Form>
  );
}