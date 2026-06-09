package models;


public class Entree {

    private String numBonEntree;
    private String numProduit;
    private int qteEntree;
    private String dateEntree;

    public Entree() {
    }

    public Entree(String numBonEntree, String numProduit, int qteEntree, String dateEntree) {
        this.numBonEntree = numBonEntree;
        this.numProduit = numProduit;
        this.qteEntree = qteEntree;
        this.dateEntree = dateEntree;
    }

    public String getNumBonEntree() {
        return numBonEntree;
    }

    public void setNumBonEntree(String numBonEntree) {
        this.numBonEntree = numBonEntree;
    }

    public String getNumProduit() {
        return numProduit;
    }

    public void setNumProduit(String numProduit) {
        this.numProduit = numProduit;
    }

    public int getQteEntree() {
        return qteEntree;
    }

    public void setQteEntree(int qteEntree) {
        this.qteEntree = qteEntree;
    }

    public String getDateEntree() {
        return dateEntree;
    }

    public void setDateEntree(String dateEntree) {
        this.dateEntree = dateEntree;
    }
}
