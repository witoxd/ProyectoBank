import { Request, Response } from "express";
import { Amortization, AmortizationI } from "../models/amortization";


export class AmortizationController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para Amortization')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllAmortization(req: Request, res:Response){
        try {
            const Amortizationes: AmortizationI[] = await Amortization.findAll() // select * from Amortizations;
            res.status(200).json({Amortizationes})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneAmortization(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const Amortizationes:AmortizationI | null = await Amortization.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (Amortizationes){
                res.status(200).json(Amortizationes)
            } else return  res.status(300).json({msg: "Amortization does not exist"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createAmortization(req: Request, res:Response){
        const {
            id,
            LoansID,
            date,
            amount,
            state
        } = req.body;

        try {
            let body:AmortizationI = {
                LoansID,
                date,
                amount,
                state
            } 

            const Amortizations:AmortizationI = await Amortization.create({...body});
            return res.status(200).json({Amortizations});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateAmortization(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            LoansID,
            date,
            amount,
            state
        }= req.body

        try {
            let body:AmortizationI = {
                LoansID,
                date,
                amount,
                state
            } 

            const AmortizationExist: AmortizationI | null = await Amortization.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!AmortizationExist) return res.status(500).json({msg:"Amortization does not exist"})
            await Amortization.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const Amortizations: AmortizationI | null = await Amortization.findByPk(pk);
        if(Amortizations) return res.status(200).json({Amortizations})

    }

    public async deletedeleteAmortization(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const AmortizationExist: AmortizationI | null = await Amortization.findByPk(pk);
            if(!AmortizationExist) return res.status(500).json({msg:"Amortization does not exist"})
            await Amortization.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Amortization removed"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}