package services;

import com.google.gson.Gson;
import models.Entree;
import utils.ApiClient;

public class EntreeService {

    private final Gson gson = new Gson();

    public Entree[] getEntrees() {
        String json = ApiClient.get("/entrees");
        return gson.fromJson(json, Entree[].class);
    }

    public void ajouterEntree(Entree entree) {
        String json = gson.toJson(entree);
        ApiClient.post("/entrees", json);
    }

    public void modifierEntree(Entree entree) {
        String json = gson.toJson(entree);
        ApiClient.put("/entrees/" + entree.getNumBonEntree(), json);
    }

    public void supprimerEntree(String numBonEntree) {
        ApiClient.delete("/entrees/" + numBonEntree);
    }
    
    public String getLastNumeroBon() {

        String json = ApiClient.get("/entrees");

        Entree[] entrees = gson.fromJson(json, Entree[].class);

        if (entrees == null || entrees.length == 0) {
            return null;
        }

        // dernier élément du tableau
        return entrees[entrees.length - 1].getNumBonEntree();
    }
}
