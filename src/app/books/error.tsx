"use client";
export default function BooksError() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen container mx-auto">
            <h2 className="text-2xl font-bold text-red-500 bg-red-100 p-4 rounded mb-2">Ops! Ocorreu um erro ao carregar os livros.</h2>
            <p className="text-gray-600">Por favor, tente novamente mais tarde.</p>
        </div>
    )
}