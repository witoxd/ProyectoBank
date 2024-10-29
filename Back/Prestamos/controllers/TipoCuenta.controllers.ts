import { Request, Response } from "express";
import { TipoCuenta, TipoCuentaI } from "../models/TipoCuenta";

export class TipoCuentaController {

    public async getAllTipoCuenta(req: Request, res:Response){
        try {
            const TipoCuentas: TipoCuentaI[] = await TipoCuenta.findAll();
            res.status(200).json({ TipoCuentas });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneTipoCuenta(req: Request, res:Response){
        const { id } = req.params;
        try {
            const TipoCuentas: TipoCuentaI | null = await TipoCuenta.findByPk(id);
            if (TipoCuentas) {
                res.status(200).json(TipoCuentas);
            } else {
                res.status(404).json({ msg: "No existe el tipo de cuenta" });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async createTipoCuenta(req: Request, res:Response){
        const { tipo, descripcion } = req.body;
        try {
            const newTipoCuenta: TipoCuentaI = await TipoCuenta.create({ tipo, descripcion });
            res.status(201).json(newTipoCuenta);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async updateTipoCuenta(req: Request, res:Response){
        const { id } = req.params;
        const { tipo, descripcion } = req.body;
        try {
            const tipoCuentaExist: TipoCuentaI | null = await TipoCuenta.findByPk(id);
            if (!tipoCuentaExist) {
                return res.status(404).json({ msg: "El tipo de cuenta no existe" });
            }
            await TipoCuenta.update({ tipo, descripcion }, { where: { id } });
            const updatedTipoCuenta: TipoCuentaI | null = await TipoCuenta.findByPk(id);
            res.status(200).json(updatedTipoCuenta);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async deleteTipoCuenta(req: Request, res:Response){
        const { id } = req.params;
        try {
            const tipoCuentaExist: TipoCuentaI | null = await TipoCuenta.findByPk(id);
            if (!tipoCuentaExist) {
                return res.status(404).json({ msg: "El tipo de cuenta no existe" });
            }
            await TipoCuenta.destroy({ where: { id } });
            res.status(200).json({ msg: "Tipo de cuenta eliminado" });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
