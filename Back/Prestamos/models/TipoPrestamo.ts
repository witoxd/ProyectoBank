import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoPrestamo extends Model {
    public tipo!: string;
    public descripcion!: string;
}
export interface TipoPrestamoI {
    tipo: string;
    descripcion: string;
}

TipoPrestamo.init({
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "TipoPrestamo",
    sequelize: database,
    timestamps: false
});
