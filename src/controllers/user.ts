import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Staff from "../Schemas/Staff";
import axios from "axios"
import Rank from "../Schemas/Rank";
import IStaff from "src/interfaces/staff";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    let { UUID } = req.body;

    axios.get(`https://api.mojang.com/user/profiles/${UUID}/names`)
        .then((response) => {
            if (response.status == 204) return res.status(500).json({
                error: true,
                message: "Please provide a valid UUID."
            });

            Staff.find({
                UUID: UUID.toString().replace(/-/g, '')
            }, (err, docs) => {
                if (docs.length) {
                    return res.status(409).json({
                        error: true,
                        message: 'This staff member already exists in the database.'
                    });
                } else {
                    const staff = new Staff({
                        _id: new mongoose.Types.ObjectId(),
                        UUID: UUID.toString().replace(/-/g, ''),
                        ranks: []
                    });

                    return staff
                        .save()
                        .then((result) => {
                            return res.status(201).json({
                                staff: result
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
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                message: err.message
            });
        });
}

const addRole = async (req: Request, res: Response, next: NextFunction) => {
    const { UUID, rank } = req.body;

    if (!UUID || !rank) return res.status(409).json({
        error: true,
        message: 'Please define the UUID and rank body property!'
    });

    const user: IStaff | null = await Staff.findOne({ UUID: UUID.toString().replace(/-/g, '') });
    if (!user) return res.status(409).json({
        error: true,
        message: 'Staff member could not be found.'
    });

    const findRank = await Rank.findOne({ name: rank.toString().toUpperCase() });
    if (!findRank) return res.status(409).json({
        error: true,
        message: 'Rank could not be found.'
    });

    if (user.ranks.includes(rank.toString().toUpperCase())) return res.status(409).json({
        error: true,
        message: 'This user already has this rank.'
    });

    user.ranks.push(rank.toString().toUpperCase());
    user.save();

    return res.status(200).json({
        staff: user
    });
}

const removeRole = async (req: Request, res: Response, next: NextFunction) => {
    const { UUID, rank } = req.body;

    if (!UUID || !rank) return res.status(409).json({
        error: true,
        message: 'Please define the UUID and rank body property!'
    });

    const user: IStaff | null = await Staff.findOne({ UUID: UUID.toString().replace(/-/g, '') });
    if (!user) return res.status(409).json({
        error: true,
        message: 'Staff member could not be found.'
    });

    const findRank = await Rank.findOne({ name: rank.toString().toUpperCase() });
    if (!findRank) return res.status(409).json({
        error: true,
        message: 'Rank could not be found.'
    });

    if (!user.ranks.includes(rank.toString().toUpperCase())) return res.status(409).json({
        error: true,
        message: 'This user already doesn\'t have this rank.'
    });

    user.ranks = user.ranks.filter(e => e !== rank.toString().toUpperCase());
    user.save();

    return res.status(200).json({
        staff: user
    });
}

const getAllStaff = (req: Request, res: Response, next: NextFunction) => {
    Staff.find()
        .exec()
        .then((staff) => {
            return res.status(200).json({
                staff,
                count: staff.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                error: true,
                message: error
            })
        });
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { UUID } = req.body;

    if (!UUID) return res.status(409).json({
        error: true,
        message: 'Please define the UUID body property!'
    });

    let user = await Staff.findOneAndDelete({
        UUID: UUID.toString().replace(/-/g, '')
    });

    if (user) {
        return res.status(201).json({
            user
        });
    } else {
        return res.status(409).json({
            error: true,
            message: 'Defined user could not be found!'
        });
    }
}

const getAllStaffWebsite = async (req: Request, res: Response, next: NextFunction) => {
    const response: any = [];
    // @ts-ignore
    await Rank.find({}).exec().then(async (docs, err) => {
        let sortable: Array<Array<any>> = [];

        if (err) return res.status(500).json({
            error: true,
            message: err
        });

        docs.forEach((rank: { name: any; priority: any; }) => {
            sortable.push([rank.name, rank.priority]);
        });

        sortable.sort((a, b) => {
            return b[1] - a[1]
        });

        sortable.forEach((arr) => {
            response.push({ rank: arr[0], players: [] });
        });

        for (let i = 0; i < response.length; i++) {
            await Staff.find({ ranks: response[i]['rank'] }).then(async (staffs) => {
                for (let j = 0; j < staffs.length; j++) {
                    await axios.get(`https://api.mojang.com/user/profiles/${staffs[j].UUID}/names`).then((username) => {
                        response[i]['players'].push({ uuid: staffs[j].UUID, name: username.data[username.data.length - 1]['name'] });
                    });
                }
            });
        }
    });

    return res.status(200).json({ response });
}

export default { createUser, addRole, getAllStaff, removeRole, deleteUser, getAllStaffWebsite };