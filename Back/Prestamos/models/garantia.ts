import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Prestamo } from "./prestamo";
export class Garantia extends Model {
    public prestamosID!: number;
    public tipogarantia!: string;
    public valorgarantia!: number;
    public descripcion!: string;
}

export interface GarantiaI {
    prestamosID: number;
    tipogarantia: string;
    valorgarantia: number;
    descripcion: string;
}

Garantia.init({
    prestamosID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipogarantia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valorgarantia: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "Garantia",
    sequelize: database,
    timestamps: false
});
Garantia.belongsTo(Prestamo,{foreignKey:"prestamosID"})