import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Cliente } from "./cliente";
import { TipoPrestamo } from "./TipoPrestamo";
// import { Empleado } from "./empleado";


export class Prestamo extends Model {
    public clienteID!: number;
    // public empleadoID!: number;
    public fechaprestamo!: Date;
    public TipoPrestamoID!: number;
    public montoprestamo!: number;
    public interes!: number;
    public estado!: boolean;
}

export interface PrestamoI {
    clienteID: number;
    // empleadoID: number;
    fechaprestamo: Date;
    TipoPrestamoID: number;
    montoprestamo: number;
    interes: number;
    estado: boolean;
}

Prestamo.init({
    clienteID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // empleadoID: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    fechaprestamo: {
        type: DataTypes.DATE,
        allowNull: false
    },
    TipoPrestamoID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    montoprestamo: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    interes: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: "Prestamo",
    sequelize: database,
    timestamps: false
});
Prestamo.belongsTo(Cliente,{foreignKey:"clienteID"})
Prestamo.belongsTo(TipoPrestamo, {foreignKey:"TipoPrestamoID"})
// Prestamo.belongsTo(Empleado,{foreignKey:"empleadoID"})