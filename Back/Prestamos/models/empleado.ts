// import { Sequelize, Model, DataTypes } from "sequelize";
// import { database } from "../database/db";

// import { Sucursal } from "./sucursal";

// export class Empleado extends Model {
//     public nombre!: string;
//     public apellido!: string;
//     public direccion!: string;
//     public correo!: string;
//     public telefono!: number;
//     public cargo!: string;
//     public sucursalID!: number;
// }

// export interface EmpleadoI {
//     nombre: string;
//     apellido: string;
//     direccion: string;
//     correo: string;
//     telefono: number;
//     cargo: string;
//     sucursalID: number;
// }

// Empleado.init({
//     nombre: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     apellido: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     direccion: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     correo: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     telefono: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     cargo: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     sucursalID: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// }, {
//     tableName: "Empleado",
//     sequelize: database,
//     timestamps: false
// });

// Empleado.belongsTo(Sucursal,{foreignKey:"sucursalID"})