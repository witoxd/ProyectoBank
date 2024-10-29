import { Request, Response } from "express";
import { Prestamo, PrestamoI } from "../models/prestamo";


export class PrestamoController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para prestamo')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllprestamo(req: Request, res:Response){
        try {
            const Prestamos: PrestamoI[] = await Prestamo.findAll() // select * from prestamos;
            res.status(200).json({Prestamos})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneprestamo(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const prestamos:PrestamoI | null = await Prestamo.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (prestamos){
                res.status(200).json(prestamos)
            } else return  res.status(300).json({msg: "No existe la prestamo"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createprestamo(req: Request, res:Response){
        const {
            id,
            clienteID,
            // empleadoID,
            fechaprestamo,
            TipoPrestamoID,
            montoprestamo,
            interes,
            estado
        } = req.body;

        try {
            let body:PrestamoI = {
                clienteID,
                // empleadoID,
                fechaprestamo,
                TipoPrestamoID,
                montoprestamo,
                interes,
                estado
            } 

            const prestamos:PrestamoI = await Prestamo.create({...body});
            return res.status(200).json({prestamos});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateprestamo(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            clienteID,
            // empleadoID,
            fechaprestamo,
            TipoPrestamoID,
            montoprestamo,
            interes,
            estado
        }= req.body

        try {
            let body:PrestamoI = {
                clienteID,
                // empleadoID,
                fechaprestamo,
                TipoPrestamoID,
                montoprestamo,
                interes,
                estado
            } 

            const prestamoExist: PrestamoI | null = await Prestamo.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!prestamoExist) return res.status(500).json({msg:"El prestamo No existe"})
            await Prestamo.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const prestamos: PrestamoI | null = await Prestamo.findByPk(pk);
        if(prestamos) return res.status(200).json({prestamos})

    }

    public async deletedeleteprestamo(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const prestamoExist: PrestamoI | null = await Prestamo.findByPk(pk);
            if(!prestamoExist) return res.status(500).json({msg:"El prestamo No existe"})
            await Prestamo.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"prestamo Eliminado"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}