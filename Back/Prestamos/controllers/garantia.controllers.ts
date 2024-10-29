import { Request, Response } from "express";
import { Garantia, GarantiaI } from "../models/garantia";


export class GarantiaController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para garantia')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllgarantia(req: Request, res:Response){
        try {
            const Garantias: GarantiaI[] = await Garantia.findAll() // select * from garantias;
            res.status(200).json({Garantias})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOnegarantia(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const Garantias:GarantiaI | null = await Garantia.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (Garantias){
                res.status(200).json(Garantias)
            } else return  res.status(300).json({msg: "No existe la garantia"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async creategarantia(req: Request, res:Response){
        const {
            id,
            prestamosID,
            tipogarantia,
            valorgarantia,
            descripcion
        } = req.body;

        try {
            let body:GarantiaI = {
                prestamosID,
                tipogarantia,
                valorgarantia,
                descripcion
            } 

            const garantias:GarantiaI = await Garantia.create({...body});
            return res.status(200).json({garantias});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updategarantia(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            prestamosID,
            tipogarantia,
            valorgarantia,
            descripcion
        }= req.body

        try {
            let body:GarantiaI = {
                prestamosID,
                tipogarantia,
                valorgarantia,
                descripcion
            } 

            const garantiaExist: GarantiaI | null = await Garantia.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!garantiaExist) return res.status(500).json({msg:"El garantia No existe"})
            await Garantia.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const garantias: GarantiaI | null = await Garantia.findByPk(pk);
        if(garantias) return res.status(200).json({garantias})

    }

    public async deletedeletegarantia(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const garantiaExist: GarantiaI | null = await Garantia.findByPk(pk);
            if(!garantiaExist) return res.status(500).json({msg:"El garantia No existe"})
            await Garantia.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"garantia Eliminado"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}