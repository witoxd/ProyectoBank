import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Cliente } from "./cliente";
import { TipoCuenta } from "./TipoCuenta";

export class Cuenta extends Model {
    public clienteID!: number;
    public numero!: number;
    public TipoCuentaID!: number;
    public saldo!: number;
}

export interface CuentaI {
    clienteID: number;
    numero: number;
    TipoCuentaID: number;
    saldo: number;
}

Cuenta.init({
    clienteID: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TipoCuentaID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    saldo: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: "Cuenta",
    sequelize: database,
    timestamps: false
});
Cuenta.belongsTo(Cliente,{foreignKey:"clienteID"})
Cuenta.belongsTo(TipoCuenta, {foreignKey: "TipoCuentaID"})