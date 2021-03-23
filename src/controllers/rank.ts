import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Rank from "../Schemas/Rank";
import Staff from "../Schemas/Staff";

const createRank = (req: Request, res: Response, next: NextFunction) => {
    let { name, priority } = req.body;

    Rank.find({
        name: name.toString().toUpperCase()
    }, (err, docs) => {
        if (docs.length) {
            return res.status(409).json({
                error: true,
                message: 'This rank already exists.'
            });
        } else {
            const rank = new Rank({
                _id: new mongoose.Types.ObjectId(),
                name: name.toUpperCase(),
                priority
            });

            return rank
                .save()
                .then((result) => {
                    return res.status(201).json({
                        rank: result
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        error: true,
                        message: error.message
                    });
                });
        }
    });
};

const editRank = async (req: Request, res: Response, next: NextFunction) => {
    let { name, priority } = req.body;

    if (!priority) return res.status(409).json({
        error: true,
        message: 'Please define the priority body property!'
    });

    let rank = await Rank.findOneAndUpdate({
        name: name.toString().toUpperCase()
    }, {
        name: req.body.newName ? req.body.newName.toString().toUpperCase() : name.toUpperCase(),
        priority
    }, { new: true });

    if (rank) {
        if (req.body.newName) {
            Staff.find({ ranks: name.toString().toUpperCase() }, (err, docs) => {
                if (err) return res.status(500).json({
                    error: true,
                    message: err.message
                });
    
                docs.forEach(doc => {
                    doc.ranks = doc.ranks.filter(e => e !== name.toString().toUpperCase())
                    doc.ranks.push(req.body.newName.toString().toUpperCase())
                    doc.save();
                });
            })
        }

        return res.status(201).json({
            rank
        });
    } else {
        return res.status(409).json({
            error: true,
            message: 'Defined rank could not be found!'
        });
    }
}

const getAllRanks = (req: Request, res: Response, next: NextFunction) => {
    Rank.find()
        .exec()
        .then((ranks) => {
            return res.status(200).json({
                ranks: ranks,
                count: ranks.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                error: true,
                message: error
            })
        });
}

const deleteRank = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (!name) return res.status(409).json({
        error: true,
        message: 'Please define the name body property!'
    });

    let rank = await Rank.findOneAndDelete({
        name: name.toString().toUpperCase()
    });

    if (rank) {
        Staff.find({ ranks: name.toString().toUpperCase() }, (err, docs) => {
            if (err) return res.status(500).json({
                error: true,
                message: err.message
            });

            docs.forEach(doc => {
                doc.ranks = doc.ranks.filter(e => e !== name.toString().toUpperCase())

                doc.save();
            });
        })

        return res.status(201).json({
            rank
        });
    } else {
        return res.status(409).json({
            error: true,
            message: 'Defined rank could not be found!'
        });
    }
}

export default { createRank, editRank, getAllRanks, deleteRank };