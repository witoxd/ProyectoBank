import { Request, Response } from "express";
import { Loan, LoanI } from "../models/loan";


export class LoanController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para Loan')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllLoan(req: Request, res:Response){
        try {
            const Loans: LoanI[] = await Loan.findAll() // select * from Loans;
            res.status(200).json({Loans})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneLoan(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const Loans:LoanI | null = await Loan.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (Loans){
                res.status(200).json(Loans)
            } else return  res.status(300).json({msg: "there is no loan"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createLoan(req: Request, res:Response){
        const {
            id,
            UserID,
            // empleadoID,
            date_loan,
            type_loanID,
            amount_loan,
            interests,
            state
        } = req.body;

        try {
            let body:LoanI = {
                UserID,
                // empleadoID,
                date_loan,
                type_loanID,
                amount_loan,
                interests,
                state
            } 

            const Loans:LoanI = await Loan.create({...body});
            return res.status(200).json({Loans});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateLoan(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            UserID,
            // empleadoID,
            date_loan,
            type_loanID,
            amount_loan,
            interests,
            state
        }= req.body

        try {
            let body:LoanI = {
                UserID,
                // empleadoID,
                date_loan,
                type_loanID,
                amount_loan,
                interests,
                state
            } 

            const LoanExist: LoanI | null = await Loan.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!LoanExist) return res.status(500).json({msg:"there is no loan"})
            await Loan.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const Loans: LoanI | null = await Loan.findByPk(pk);
        if(Loans) return res.status(200).json({Loans})

    }

    public async deletedeleteLoan(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const LoanExist: LoanI | null = await Loan.findByPk(pk);
            if(!LoanExist) return res.status(500).json({msg:"there is no loan"})
            await Loan.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Loan removed"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}