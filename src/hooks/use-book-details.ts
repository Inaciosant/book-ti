import { useQuery } from '@tanstack/react-query'

type BookDetail = {
  error: string;
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  language: string;
  isbn10: string;
  isbn13: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
  url: string;
  pdf?: Record<string, string>; 
}

async function fetchBook(id: string) {
  const res = await fetch(`https://api.itbook.store/1.0/books/${id}`)
  if (!res.ok) throw new Error('Falha ao buscar detalhes')
  return res.json()
}

export function useBookDetails(id: string) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id),
    enabled: !!id, 
  })
}