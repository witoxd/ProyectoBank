import { Request, Response } from "express";
import { TypeLoan, TypeLoanI} from "../models/loan_types";

export class TypeLoanController {

    public async getAllTypeLoan(req: Request, res:Response){
        try {
            const TypeLoans: TypeLoanI[] = await TypeLoan.findAll();
            res.status(200).json({ TypeLoans });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneTypeLoan(req: Request, res:Response){
        const { id } = req.params;
        try {
            const TypeLoans: TypeLoanI | null = await TypeLoan.findByPk(id);
            if (TypeLoans) {
                res.status(200).json(TypeLoans);
            } else {
                res.status(404).json({ msg: "The type of loan does not exist" });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async createTypeLoan(req: Request, res:Response){
        const { type, description } = req.body;
        try {
            const newTypeLoan: TypeLoanI = await TypeLoan.create({ type, description });
            res.status(201).json(newTypeLoan);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async updateTypeLoan(req: Request, res:Response){
        const { id } = req.params;
        const { type, description } = req.body;
        try {
            const TypeLoanExist: TypeLoanI | null = await TypeLoan.findByPk(id);
            if (!TypeLoanExist) {
                return res.status(404).json({ msg: "The type of loan does not exist" });
            }
            await TypeLoan.update({ type, description }, { where: { id } });
            const updatedTypeLoan: TypeLoanI | null = await TypeLoan.findByPk(id);
            res.status(200).json(updatedTypeLoan);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async deleteTypeLoan(req: Request, res:Response){
        const { id } = req.params;
        try {
            const TypeLoanExist: TypeLoanI | null = await TypeLoan.findByPk(id);
            if (!TypeLoanExist) {
                return res.status(404).json({ msg: "The type of loan does not exist" });
            }
            await TypeLoan.destroy({ where: { id } });
            res.status(200).json({ msg: "type of loan removed" });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
