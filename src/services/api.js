const API_URL = import.meta.env.VITE_API_URL;

// Fonction commune à tous les appels à l'API.
// Elle ajoute automatiquement le token si l'utilisateur est connecté.
export async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur serveur");
  return data;
}
