
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBooks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
                <Skeleton className="w-full h-64 rounded-md" />
                <Skeleton className="w-3/4 h-6 rounded" />
                <Skeleton className="w-1/2 h-4 rounded" />
            </div>
        ))}
    </div>
  );
}