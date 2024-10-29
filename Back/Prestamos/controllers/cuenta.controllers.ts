import { Request, Response } from "express";
import { Cuenta, CuentaI } from "../models/cuenta";


export class CuentaController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para cuenta')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllcuenta(req: Request, res:Response){
        try {
            const Cuentas: CuentaI[] = await Cuenta.findAll() // select * from cuentas;
            res.status(200).json({Cuentas})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOnecuenta(req: Request, res:Response){
        const { id } = req.params

        try {
            const Cuentas:CuentaI | null = await Cuenta.findByPk(id)
            if (Cuentas){
                res.status(200).json(Cuentas)
            } else return  res.status(300).json({msg: "No existe la cuenta"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createcuenta(req: Request, res:Response){
        const {
            id,
            clienteID,
            numero,
            TipoCuentaID,
            saldo
        } = req.body;

        try {
            let body:CuentaI = {
                clienteID,
                numero,
                TipoCuentaID,
                saldo
            } 

            const cuentas:CuentaI = await Cuenta.create({...body});
            return res.status(200).json({cuentas});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updatecuenta(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            clienteID,
            numero,
            TipoCuentaID,
            saldo
        }= req.body

        try {
            let body:CuentaI = {
                clienteID,
                numero,
                TipoCuentaID,
                saldo
            } 

            const cuentaExist: CuentaI | null = await Cuenta.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!cuentaExist) return res.status(500).json({msg:"El cuenta No existe"})
            await Cuenta.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const cuentas: CuentaI | null = await Cuenta.findByPk(pk);
        if(cuentas) return res.status(200).json({cuentas})

    }

    public async deletedeletecuenta(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const cuentaExist: CuentaI | null = await Cuenta.findByPk(pk);
            if(!cuentaExist) return res.status(500).json({msg:"El cuenta No existe"})
            await Cuenta.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"cuenta Eliminado"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}