import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// À remplacer avec les infos de ton projet Supabase
const SUPABASE_URL = "COLLE_ICI_TON_PROJECT_URL";
const SUPABASE_KEY = "COLLE_ICI_TA_CLE_PUBLISHABLE";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const inputMagasin = document.getElementById("nomMagasin");
const btnAjouter = document.getElementById("btnAjouter");
const listeMagasins = document.getElementById("listeMagasins");

btnAjouter.addEventListener("click", ajouterMagasin);

async function ajouterMagasin() {
  const nom = inputMagasin.value.trim();

  if (nom === "") {
    alert("Merci d’écrire un nom de magasin.");
    return;
  }

  const { error } = await supabase
    .from("magasins")
    .insert([
      { nom: nom }
    ]);

  if (error) {
    console.error("Erreur Supabase :", error);
    alert("Erreur lors de l’enregistrement.");
    return;
  }

  inputMagasin.value = "";
  afficherMagasins();
}

async function afficherMagasins() {
  const { data, error } = await supabase
    .from("magasins")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur Supabase :", error);
    listeMagasins.innerHTML = "Erreur lors du chargement.";
    return;
  }

  if (data.length === 0) {
    listeMagasins.innerHTML = "Aucun magasin enregistré.";
    return;
  }

  listeMagasins.innerHTML = data
    .map((magasin) => {
      return `<div class="magasin">${magasin.nom}</div>`;
    })
    .join("");
}

afficherMagasins();
