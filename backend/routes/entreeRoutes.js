const express = require('express');
const router = express.Router();

const db = require('../db');


// ==========================
// AJOUT BON ENTREE
// ==========================
router.post('/', (req, res) => {

    const {
        numBonEntree,
        numProduit,
        qteEntree,
        dateEntree
    } = req.body;

    const sql = `
        INSERT INTO bon_entree(
            numBonEntree,
            numProduit,
            qteEntree,
            dateEntree
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            numBonEntree,
            numProduit,
            qteEntree,
            dateEntree
        ],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }
            res.json({
                        message: "Bon d'entrée ajouté avec succès"
                    });
            
        }
    );

});


// ==========================
// LISTE DES ENTREES
// ==========================
router.get('/', (req, res) => {

    const sql = `
        SELECT *
        FROM bon_entree
        ORDER BY CAST(SUBSTRING(numBonEntree, 3) AS UNSIGNED) ASC;
    `;

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


// ==========================
// MODIFICATION
// ==========================
router.put('/:id', (req, res) => {

    const id = req.params.id;

    const {
        numProduit,
        qteEntree,
        dateEntree
    } = req.body;

    const sql = `
        UPDATE bon_entree
        SET
            numProduit = ?,
            qteEntree = ?,
            dateEntree = ?
        WHERE numBonEntree = ?
    `;

    db.query(
        sql,
        [
            numProduit,
            qteEntree,
            dateEntree,
            id
        ],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message: "Bon d'entrée modifié"
            });

        }
    );

});


// ==========================
// SUPPRESSION
// ==========================
router.delete('/:id', (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM bon_entree
        WHERE numBonEntree = ?
    `;

    db.query(sql, [id], (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            message: "Bon d'entrée supprimé"
        });

    });

});


module.exports = router;