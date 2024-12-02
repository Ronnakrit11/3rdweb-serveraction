export interface Customer {
    id: string;
    userId: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Service {
    id: string;
    userId: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    invoiceId: string;
  }
  
  export interface Invoice {
    id: string;
    number: string;
    userId: string;
    clientName: string;
    clientEmail: string;
    amount: number;
    status: 'pending' | 'paid' | 'rejected';
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    items: InvoiceItem[];
  }