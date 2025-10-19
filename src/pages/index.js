import { useState } from 'react';
import AddMovie from '@/components/AddMovie';
import AllMovies from '@/components/AllMovies';
import WatchedMovies from '@/components/WatchedMovies';
import NotWatchedMovies from '@/components/NotWatchedMovies';

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState('todos'); // 'todos', 'assistidos', 'nao-assistidos'
  const [atualizarLista, setAtualizarLista] = useState(0);

  const recarregarFilmes = () => {
    setAtualizarLista(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Botão Adicionar Filme */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-6">
          <AddMovie onFilmeAdicionado={recarregarFilmes} />
        </div>
      </div>

      {/* Tabs/Abas */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 py-4">
            <button
              onClick={() => setAbaAtiva('todos')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                abaAtiva === 'todos'
                  ? 'bg-black text-white'
                  : 'bg-white text-black border border-black hover:bg-gray-100'
              }`}
            >
              Todos
            </button>
            
            <button
              onClick={() => setAbaAtiva('assistidos')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                abaAtiva === 'assistidos'
                  ? 'bg-black text-white'
                  : 'bg-white text-black border border-black hover:bg-gray-100'
              }`}
            >
              Assistidos
            </button>
            
            <button
              onClick={() => setAbaAtiva('nao-assistidos')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                abaAtiva === 'nao-assistidos'
                  ? 'bg-black text-white'
                  : 'bg-white text-black border border-black hover:bg-gray-100'
              }`}
            >
              Não Assistidos
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo - Renderiza componente baseado na aba ativa */}
      <div>
        {abaAtiva === 'todos' && <AllMovies key={`todos-${atualizarLista}`} />}
        {abaAtiva === 'assistidos' && <WatchedMovies key={`assistidos-${atualizarLista}`} />}
        {abaAtiva === 'nao-assistidos' && <NotWatchedMovies key={`nao-assistidos-${atualizarLista}`} />}
      </div>
    </div>
  );
}