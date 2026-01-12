import { SearchX } from "lucide-react";

interface EmptyStateProps {
  term: string;
}

export const EmptyState = ({ term }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in fade-in-50">
      <div className="p-6 bg-gray-50 rounded-full">
        <SearchX className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">
        Nenhum livro encontrado
      </h3>
      <p className="text-gray-500">
        Não encontramos resultados para o termo <span className="font-bold">"{term}"</span>.
      </p>
    </div>
  );
};