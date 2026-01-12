import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  reset?: () => void; 
}

export const ErrorState = ({ error, reset }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
      <div className="p-4 bg-red-100 rounded-full">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">Ops, algo deu errado!</h2>
      <p className="text-gray-500 max-w-sm">{error}</p>
      
      {reset && (
        <Button onClick={reset} variant="outline">
          Tentar Novamente
        </Button>
      )}
    </div>
  );
};