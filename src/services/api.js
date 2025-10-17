export async function carregarFilmesAPI() {
  try {
    const response = await fetch("/api/movies");

    if (!response.ok) {
      console.error("Erro na resposta:", response.status, response.statusText);
      throw new Error("Erro ao carregar nomes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao carregar nomes:", error);
    throw error;
  }
}

export async function AdicionarFilmeAPI(movie) {
  try {
    const response = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || "Erro ao adicionar Filme");
    }

    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error("Erro ao salvar o filme", error);
    throw error;
  }
}

export async function eliminarFilmesAPI(id) {
  try {
    const response = await fetch(`/api/movie/${id}`, {
      method: "DELETE",
            
    });
    return response;
  } catch {
    alert("erro , ", response);
  }
}
