const express = require('express');
const router = express.Router();

const db = require('../db');


// AJOUT PRODUIT
router.post('/', (req, res) => {

    const { numProduit, design, stock } = req.body;

    const sql = `
        INSERT INTO produit(numProduit, design, stock)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [numProduit, design, stock], (err, result) => {

        if(err){
            res.status(500).json(err);
        } else {
            res.json({
                message: "Produit ajouté"
            });
        }

    });

});


// LISTE PRODUITS
router.get('/', (req, res) => {

    db.query("SELECT * FROM produit", (err, result) => {

        if(err){
            res.status(500).json(err);
        } else {
            res.json(result);
        }

    });

});


// RECHERCHE
router.get('/:mot', (req, res) => {

    const mot = req.params.mot;

    const sql = `
        SELECT * FROM produit
        WHERE numProduit LIKE ?
        OR design LIKE ?
    `;

    db.query(sql, [`%${mot}%`, `%${mot}%`], (err, result) => {

        if(err){
            res.status(500).json(err);
        } else {
            res.json(result);
        }

    });

});


// MODIFICATION
router.put('/:id', (req, res) => {

    const id = req.params.id;

    const { design, stock } = req.body;

    const sql = `
        UPDATE produit
        SET design=?, stock=?
        WHERE numProduit=?
    `;

    db.query(sql, [design, stock, id], (err, result) => {

        if(err){
            res.status(500).json(err);
        } else {
            res.json({
                message: "Produit modifié"
            });
        }

    });

});


// SUPPRESSION
router.delete('/:id', (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM produit WHERE numProduit=?",
        [id],
        (err, result) => {

            if(err){
                res.status(500).json(err);
            } else {
                res.json({
                    message: "Produit supprimé"
                });
            }

        }
    );

});

// GET by ID
router.get('/id/:id', (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM produit WHERE numProduit=?",
        [id],
        (err, result) => {

            if(err){
                res.status(500).json(err);
            } else {
                res.json(result);
            }

        }
    );

});

module.exports = router;