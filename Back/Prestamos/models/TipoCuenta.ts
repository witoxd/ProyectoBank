import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoCuenta extends Model {
    public tipo!: string;
    public descripcion!: string;
}
export interface TipoCuentaI {
    tipo: string;
    descripcion: string;
}

TipoCuenta.init({
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "TipoCuenta",
    sequelize: database,
    timestamps: false
});

