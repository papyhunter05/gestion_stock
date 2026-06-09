package services;

import com.google.gson.Gson;
import models.Sortie;
import utils.ApiClient;

public class SortieService {

    private final Gson gson = new Gson();

    public Sortie[] getSorties() {
        String json = ApiClient.get("/sorties");
        return gson.fromJson(json, Sortie[].class);
    }

    public void ajouterSortie(Sortie sortie) {
        String json = gson.toJson(sortie);
        ApiClient.post("/sorties", json);
    }

    public void modifierSortie(Sortie sortie) {
        String json = gson.toJson(sortie);
        ApiClient.put("/sorties/" + sortie.getNumBonSortie(), json);
    }

    public void supprimerSortie(String numBonSortie) {
        ApiClient.delete("/sorties/" + numBonSortie);
    }

    public String getLastNumeroBon() {
        String json = ApiClient.get("/sorties");
        Sortie[] sorties = gson.fromJson(json, Sortie[].class);
        if (sorties == null || sorties.length == 0) {
            return null;
        }
        return sorties[sorties.length - 1].getNumBonSortie();
    }
}
