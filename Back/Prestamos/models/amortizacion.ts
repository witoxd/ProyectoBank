import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Prestamo } from "./prestamo";

export class Amortizacion extends Model {
    public prestamosID!: number;
    public fecha!: Date;
    public monto!: number;
    public estado!: boolean;
}

export interface AmortizacionI {
    prestamosID: number;
    fecha: Date;
    monto: number;
    estado: boolean;
}

Amortizacion.init({
    prestamosID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    monto: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: "Amortizacion",
    sequelize: database,
    timestamps: false
});
Amortizacion.belongsTo(Prestamo,{foreignKey:"prestamosID"})