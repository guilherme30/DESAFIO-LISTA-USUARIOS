import { database } from "../database.js";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient(); 

export const getUsers = (_, res) => {
    const q = "SELECT * FROM user";

    database.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = async (req, res) => {

    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            date: req.body.date, 
        }
    });

    return res.status(200).json("USUÁRIO CADASTRADO!");

};

export const updateUser = async (req, res) => {

    const {id} = req.params;

    const updateUser = await prisma.user.update({

        where: {
            id: Number(id)
        },
        data: {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            date: req.body.date,
        }

      });

      return res.status(200).json("USUÁRIO ATUALIZADO!");

};

export const deleteUser = async(req, res) => {

    const {id} = req.params;

    const deleteUser = await prisma.user.delete({
        where: {
            id: Number(id)
        }

      });

      return res.status(200).json("USUÁRIO DELETADO!");

};