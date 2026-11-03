import defaultUsers from "../data/users.json";
import { readStorage, writeStorage } from "../utils/storage";
 
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
// Hachage SHA-256 d'un mot de passe : on ne stocke jamais un mot de passe en clair.
// crypto.subtle est fourni par le navigateur (il marche sur http://localhost et en https).
async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
 
// Comptes de départ (src/data/users.json) + comptes créés sur le site (localStorage)
function allUsers() {
  return [...defaultUsers, ...readStorage("users", [])];
}
 
// On ne renvoie jamais le mot de passe au reste de l'application
function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}
 
// Inscription : renvoie { user } ou lève une erreur avec un message clair
export async function registerUser({ name, email, password }) {
  if (!name?.trim() || !email?.trim() || !password) {
    throw new Error("Tous les champs sont obligatoires.");
  }
  if (!EMAIL_REGEX.test(email.trim())) throw new Error("Adresse e-mail invalide.");
  if (password.length < 6) throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
  if (allUsers().some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
    throw new Error("Cet e-mail est déjà utilisé.");
  }
 
  const user = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    password: await hashPassword(password),
  };
  writeStorage("users", [...readStorage("users", []), user]);
  return { user: publicUser(user) };
}
 
// Connexion : on compare les empreintes (hash), pas les mots de passe
export async function loginUser({ email, password }) {
  const hash = await hashPassword(password || "");
  const user = allUsers().find(
    (u) => u.email.toLowerCase() === (email || "").trim().toLowerCase() && u.password === hash
  );
  // Même message dans les deux cas : on ne révèle pas si l'e-mail existe
  if (!user) throw new Error("Identifiants incorrects.");
  return { user: publicUser(user) };
}
