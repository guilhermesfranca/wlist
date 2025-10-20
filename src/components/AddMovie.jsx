import { useState } from "react";
import { AdicionarFilmeAPI } from "@/services/api";

export default function AddMovie({onFilmeAdicionado}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState(0);

  const generos = [
    "Ação",
    "Comédia",
    "Drama",
    "Ficção Científica",
    "Romance",
    "Terror",
    "Animação",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoFilme = { 
      title, 
      year: parseInt(year), 
      genre, 
      watched, 
      rating 
    };

    

    console.log("📤 Enviando para API:", novoFilme);

    try {
      const data = await AdicionarFilmeAPI(novoFilme);
      console.log("✅ Filme salvo:", data);
      
      // Limpar formulário após sucesso
      setTitle("");
      setYear("");
      setGenre("");
      setWatched(false);
      setRating(0);
      setIsOpen(false);

       if (onFilmeAdicionado) {
        onFilmeAdicionado();
      }
    } catch (error) {
      console.error("❌ Erro completo:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  

  return (
    <div className="flex justify-center mt-2">
      <button
        onClick={() => setIsOpen(true)}
        className="border border-black text-black hover:bg-black hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition"
      >
        Adicionar filme
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-50"
          aria-hidden={!isOpen}
        >
          <div className="relative p-6 w-full max-w-md bg-white rounded-xl shadow-lg border border-black">
            <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-2">
              <h3 className="text-lg font-semibold text-black">
                Adicionar Filme
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-gray-500 text-lg"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-1 text-sm font-medium text-black"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite o título do filme"
                  className="border border-black rounded-lg w-full p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block mb-1 text-sm font-medium text-black"
                >
                  Ano
                </label>
                <input
                  type="number"
                  id="year"
                  value={year}
                  placeholder="Ex: 2023"
                  onChange={(e) => setYear(e.target.value)}
                  className="border border-black rounded-lg w-full p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block mb-1 text-sm font-medium text-black"
                >
                  Gênero
                </label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="border border-black rounded-lg w-full p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="">Selecione um gênero</option>
                  {generos.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="watched"
                  checked={watched}
                  onChange={(e) => setWatched(e.target.checked)}
                  className="w-4 h-4 border border-black rounded-sm"
                />
                <label htmlFor="watched" className="text-sm text-black">
                  Já assisti
                </label>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-black">
                  Avaliação
                </label>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => {
                    const value = i + 1;
                    return (
                      <button
                        type="button"
                        key={value}
                        onClick={() => setRating(value)}
                        className={`text-2xl ${
                          value <= rating ? "text-black" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full border border-black text-black hover:bg-black hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition"
              >
                Salvar filme
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}