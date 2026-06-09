package services;

import com.google.gson.Gson;
import models.Produit;
import utils.ApiClient;

public class ProduitService {

    Gson gson = new Gson();

    public Produit[] getProduits() {

        String json = ApiClient.get("/produits");

        return gson.fromJson(
                json,
                Produit[].class
        );
    }

    public void ajouterProduit(Produit produit) {

        String json = gson.toJson(produit);

        ApiClient.post("/produits", json);
    }

    public void modifierProduit(Produit produit) {

        String json = gson.toJson(produit);

        ApiClient.put("/produits/" + produit.getNumProduit(), json);
    }

    public void supprimerProduit(String code) {

        ApiClient.delete("/produits/" + code);
    }

    public Produit getProduitByID(String code) {

        String json = ApiClient.get("/produits/" + code);

        return gson.fromJson(
                json,
                Produit.class
        );
    }
}