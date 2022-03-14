import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
  }

 type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

  interface TransactionsProviderProps {
      children: ReactNode
  }

  interface TransactionsContextData {
      transactions: Transaction[];
      createTransaction: (transaction: TransactionInput) => Promise<void>
  }

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);



export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadData() {
    try {
      const response = await api.get("transactions");
      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createTransaction(transaction: TransactionInput) {
      try {
       const response = await api.post("/transactions", {
         ...transaction,
         createdAt: new Date()
       });
       
       
       setTransactions([...transactions, response.data.transaction])
      } catch (error) {
        console.log(error);
      }
  }

  return (
      <TransactionsContext.Provider value={{transactions, createTransaction}}>
          {children}
      </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}


