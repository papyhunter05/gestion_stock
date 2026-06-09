const express = require('express');
const router = express.Router();

const db = require('../db');


// AJOUT BON SORTIE
router.post('/', (req, res) => {

    const {
        numBonSortie,
        numProduit,
        qteSortie,
        dateSortie
    } = req.body;

    // Vérifier le stock actuel

    db.query(
        "SELECT stock FROM produit WHERE numProduit=?",
        [numProduit],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            if(result.length === 0){
                return res.json({
                    message: "Produit introuvable"
                });
            }

            const stockActuel = result[0].stock;

            // Vérification stock suffisant

            if(stockActuel < qteSortie){

                return res.json({
                    message: "Stock insuffisant"
                });

            }

            // Insertion bon sortie

            const sql = `
                INSERT INTO bon_sortie
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                sql,
                [
                    numBonSortie,
                    numProduit,
                    qteSortie,
                    dateSortie
                ],
                (err2, result2) => {

                    if(err2){
                        return res.status(500).json(err2);
                    }

                    res.json({
                        message: "Sortie enregistrée"
                    });

                }
            );

        }
    );

});


// LISTE DES SORTIES
router.get('/', (req, res) => {

    db.query(
        `SELECT *
        FROM bon_sortie
        ORDER BY CAST(SUBSTRING(numBonSortie, 3) AS UNSIGNED) ASC`,
        (err, result) => {

            if(err){
                res.status(500).json(err);
            } else {
                res.json(result);
            }

        }
    );

});


// SUPPRESSION D'UNE SORTIE
router.delete('/:id', (req, res) => {

    const id = req.params.id;

    // récupérer les infos avant suppression

    db.query(
        "SELECT * FROM bon_sortie WHERE numBonSortie=?",
        [id],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            if(result.length === 0){
                return res.json({
                    message: "Bon sortie introuvable"
                });
            }

            const sortie = result[0];

            // suppression

            db.query(
                "DELETE FROM bon_sortie WHERE numBonSortie=?",
                [id],
                (err2, result2) => {

                    if(err2){
                        return res.status(500).json(err2);
                    }

                    res.json({
                        message: "Sortie supprimée"
                    });

                }
            );

        }
    );

});

// MODIFICATION D'UNE SORTIE
router.put('/:id', (req, res) => {

    const id = req.params.id;
    const {
        numProduit,
        qteSortie,
        dateSortie
    } = req.body;
    const sql = `
        UPDATE bon_sortie
        SET
            numProduit = ?,
            qteSortie = ?,
            dateSortie = ?
        WHERE numBonSortie = ?
    `;

    db.query(
        sql,
        [
            numProduit,
            qteSortie,
            dateSortie,
            id
        ],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message: "Sortie modifiée"
            });

        }
    );

});

module.exports = router;