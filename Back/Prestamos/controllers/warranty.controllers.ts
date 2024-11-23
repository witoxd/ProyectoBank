import { Request, Response } from "express";
import { warranty, warrantyI } from "../models/warranty";


export class warrantyController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para warranty')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllwarranty(req: Request, res:Response){
        try {
            const warrantys: warrantyI[] = await warranty.findAll() 
            res.status(200).json({warrantys})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOnewarranty(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const warrantys:warrantyI | null = await warranty.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (warrantys){
                res.status(200).json(warrantys)
            } else return  res.status(300).json({msg: "the warranty does not exist"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createwarranty(req: Request, res:Response){
        const {
            id,
            LoanID,
            type_warranty,
            value_warranty,
            description
        } = req.body;

        try {
            let body:warrantyI = {
                LoanID,
                type_warranty,
                value_warranty,
                description
            } 

            const warrantys:warrantyI = await warranty.create({...body});
            return res.status(200).json({warrantys});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updatewarranty(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            LoanID,
            type_warranty,
            value_warranty,
            description
        }= req.body

        try {
            let body:warrantyI = {
                LoanID,
                type_warranty,
                value_warranty,
                description
            } 

            const warrantyExist: warrantyI | null = await warranty.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!warrantyExist) return res.status(500).json({msg:"the warranty does not exist"})
            await warranty.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const warrantys: warrantyI | null = await warranty.findByPk(pk);
        if(warrantys) return res.status(200).json({warrantys})

    }

    public async deletedeletewarranty(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const warrantyExist: warrantyI | null = await warranty.findByPk(pk);
            if(!warrantyExist) return res.status(500).json({msg:"the warranty does not exist"})
            await warranty.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"warranty remove"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}