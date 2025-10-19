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
    const response = await fetch("/api/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
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

export async function toggleWatchedAPI(id) {
  try {
    const response = await fetch(`/api/movie/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toggleWatched: true })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar status watched');
    }
    
    return response.json();
  } catch (error) {
    alert("Erro ao atualizar: ", error);
    throw error;
  }
}

export async function editarFilmesAPI(id, movieData) {
  try {
    const response = await fetch(`/api/movie/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || "Erro ao atualizar filme");
    }

    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error("Erro ao atualizar filme", error);
    throw error;
  }
}
