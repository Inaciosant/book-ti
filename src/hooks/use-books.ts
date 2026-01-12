import { useQuery } from '@tanstack/react-query'

type ItBookResponse = {
  error: string;
  total: string;
  page: string;
  books: Array<{
    title: string;
    subtitle: string;
    isbn13: string;
    price: string;
    image: string;
    url: string;
  }>;
}

async function fetchBooks(query: string): Promise<ItBookResponse> {
  const res = await fetch(`https://api.itbook.store/1.0/search/${query}`)
  return res.json()
}

export function useBooks(query: string) {
  return useQuery({
    queryKey: ['books', query],
    queryFn: () => fetchBooks(query),
  })
}