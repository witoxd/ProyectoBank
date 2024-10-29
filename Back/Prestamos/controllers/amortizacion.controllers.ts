import { Request, Response } from "express";
import { Amortizacion, AmortizacionI } from "../models/amortizacion";


export class AmortizacionController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para amortizacion')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllamortizacion(req: Request, res:Response){
        try {
            const Amortizaciones: AmortizacionI[] = await Amortizacion.findAll() // select * from amortizacions;
            res.status(200).json({Amortizaciones})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneamortizacion(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const Amortizaciones:AmortizacionI | null = await Amortizacion.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (Amortizaciones){
                res.status(200).json(Amortizaciones)
            } else return  res.status(300).json({msg: "No existe la amortizacion"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createamortizacion(req: Request, res:Response){
        const {
            id,
            prestamosID,
            fecha,
            monto,
            estado
        } = req.body;

        try {
            let body:AmortizacionI = {
                prestamosID,
                fecha,
                monto,
                estado
            } 

            const amortizacions:AmortizacionI = await Amortizacion.create({...body});
            return res.status(200).json({amortizacions});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateamortizacion(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            prestamosID,
            fecha,
            monto,
            estado
        }= req.body

        try {
            let body:AmortizacionI = {
                prestamosID,
                fecha,
                monto,
                estado
            } 

            const amortizacionExist: AmortizacionI | null = await Amortizacion.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!amortizacionExist) return res.status(500).json({msg:"El amortizacion No existe"})
            await Amortizacion.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const amortizacions: AmortizacionI | null = await Amortizacion.findByPk(pk);
        if(amortizacions) return res.status(200).json({amortizacions})

    }

    public async deletedeleteamortizacion(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const amortizacionExist: AmortizacionI | null = await Amortizacion.findByPk(pk);
            if(!amortizacionExist) return res.status(500).json({msg:"El amortizacion No existe"})
            await Amortizacion.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"amortizacion Eliminado"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}