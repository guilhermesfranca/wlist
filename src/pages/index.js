import { useState } from "react";
import AddMovie from "@/components/AddMovie";
import AllMovies from "@/components/AllMovies";

export default function Home() {
  const [atualizarLista, setAtualizarLista] = useState(0);

  const recarregarFilmes = () => {
    setAtualizarLista((prev) => prev + 1);
  };

  return (
    <div>
      <AddMovie onFilmeAdicionado={recarregarFilmes} />
      <AllMovies key={atualizarLista} />
    </div>
  );
}
