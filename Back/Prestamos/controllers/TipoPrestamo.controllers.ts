import { Request, Response } from "express";
import { TipoPrestamo, TipoPrestamoI} from "../models/TipoPrestamo";

export class TipoPrestamoController {

    public async getAllTipoPrestamo(req: Request, res:Response){
        try {
            const TipoPrestamos: TipoPrestamoI[] = await TipoPrestamo.findAll();
            res.status(200).json({ TipoPrestamos });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneTipoPrestamo(req: Request, res:Response){
        const { id } = req.params;
        try {
            const TipoPrestamos: TipoPrestamoI | null = await TipoPrestamo.findByPk(id);
            if (TipoPrestamos) {
                res.status(200).json(TipoPrestamos);
            } else {
                res.status(404).json({ msg: "No existe el tipo de préstamo" });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async createTipoPrestamo(req: Request, res:Response){
        const { tipo, descripcion } = req.body;
        try {
            const newTipoPrestamo: TipoPrestamoI = await TipoPrestamo.create({ tipo, descripcion });
            res.status(201).json(newTipoPrestamo);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async updateTipoPrestamo(req: Request, res:Response){
        const { id } = req.params;
        const { tipo, descripcion } = req.body;
        try {
            const tipoPrestamoExist: TipoPrestamoI | null = await TipoPrestamo.findByPk(id);
            if (!tipoPrestamoExist) {
                return res.status(404).json({ msg: "El tipo de préstamo no existe" });
            }
            await TipoPrestamo.update({ tipo, descripcion }, { where: { id } });
            const updatedTipoPrestamo: TipoPrestamoI | null = await TipoPrestamo.findByPk(id);
            res.status(200).json(updatedTipoPrestamo);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async deleteTipoPrestamo(req: Request, res:Response){
        const { id } = req.params;
        try {
            const tipoPrestamoExist: TipoPrestamoI | null = await TipoPrestamo.findByPk(id);
            if (!tipoPrestamoExist) {
                return res.status(404).json({ msg: "El tipo de préstamo no existe" });
            }
            await TipoPrestamo.destroy({ where: { id } });
            res.status(200).json({ msg: "Tipo de préstamo eliminado" });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
