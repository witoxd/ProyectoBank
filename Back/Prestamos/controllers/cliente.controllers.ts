import { Request, Response } from "express";
import { Cliente, ClienteI } from "../models/cliente";


export class ClienteController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para Cliente')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllcliente(req: Request, res:Response){
        try {
            const Clientes: ClienteI[] = await Cliente.findAll() // select * from clientes;
            res.status(200).json({Clientes})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneCliente(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const Clientes:ClienteI | null = await Cliente.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (Clientes){
                res.status(200).json(Clientes)
            } else return  res.status(300).json({msg: "No existe el Cliente"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
            
        }
    }

    public async createCliente(req: Request, res:Response){
        const {
            id,
            nombre,
            apellido,
            direccion,
            correo,
            telefono,
        } = req.body;

        try {
            let body:ClienteI = {
                nombre,
                apellido,
                direccion,
                correo,
                telefono,
            } 

            const Clientes:ClienteI = await Cliente.create({...body});
            return res.status(200).json({Clientes});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateCliente(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            nombre,
            apellido,
            direccion,
            correo,
            telefono,
        }= req.body

        try {
            let body:ClienteI = {
                nombre,
                apellido,
                direccion,
                correo,
                telefono,
            } 

            const ClienteExist: ClienteI | null = await Cliente.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!ClienteExist) return res.status(500).json({msg:"El cliente No existe"})
            await Cliente.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const Clientes: ClienteI | null = await Cliente.findByPk(pk);
        if(Clientes) return res.status(200).json({Clientes})

    }

    public async deletedeletecliente(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const ClienteExist: ClienteI | null = await Cliente.findByPk(pk);
            if(!ClienteExist) return res.status(500).json({msg:"El Cliente No existe"})
            await Cliente.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"cliente Eliminado"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}