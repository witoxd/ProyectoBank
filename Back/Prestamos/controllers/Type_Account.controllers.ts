import { Request, Response } from "express";
import { TypeAccount, TypeAccountI } from "../models/types_account";

export class TypeAccountController {

    public async getAllTypeAccount(req: Request, res:Response){
        try {
            const TypeAccounts: TypeAccountI[] = await TypeAccount.findAll();
            res.status(200).json({ TypeAccounts });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneTypeAccount(req: Request, res:Response){
        const { id } = req.params;
        try {
            const TypeAccounts: TypeAccountI | null = await TypeAccount.findByPk(id);
            if (TypeAccounts) {
                res.status(200).json(TypeAccounts);
            } else {
                res.status(404).json({ msg: "The account type does not exist" });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async createTypeAccount(req: Request, res:Response){
        const { type, description } = req.body;
        try {
            const newTypeAccount: TypeAccountI = await TypeAccount.create({ type, description });
            res.status(201).json(newTypeAccount);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async updateTypeAccount(req: Request, res:Response){
        const { id } = req.params;
        const { type, description } = req.body;
        try {
            const TypeAccountExist: TypeAccountI | null = await TypeAccount.findByPk(id);
            if (!TypeAccountExist) {
                return res.status(404).json({ msg: "The account type does not exist" });
            }
            await TypeAccount.update({ type, description }, { where: { id } });
            const updatedTypeAccount: TypeAccountI | null = await TypeAccount.findByPk(id);
            res.status(200).json(updatedTypeAccount);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async deleteTypeAccount(req: Request, res:Response){
        const { id } = req.params;
        try {
            const TypeAccountExist: TypeAccountI | null = await TypeAccount.findByPk(id);
            if (!TypeAccountExist) {
                return res.status(404).json({ msg: "The account type does not exist" });
            }
            await TypeAccount.destroy({ where: { id } });
            res.status(200).json({ msg: "deleted account type" });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
