import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { User } from "./User";
import { TypeLoan } from "./loan_types";
// import { Empleado } from "./empleado";


export class Loan extends Model {
    public id!: number;
    public UserID!: number;
    // public empleadoID!: number;
    public date_loan!: Date;
    public type_loanID!: number;
    public amount_loan!: number;
    public interests!: number;
    public state!: boolean;
}

export interface LoanI {
    id: number;
    UserID: number;
    // empleadoID: number;
    date_loan: Date;
    type_loanID: number;
    amount_loan: number;
    interests: number;
    state: boolean;
}

Loan.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // empleadoID: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    date_loan: {
        type: DataTypes.DATE,
        allowNull: false
    },
    type_loanID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount_loan: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    interests: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: "Loan",
    sequelize: database,
    timestamps: false
});
Loan.belongsTo(User,{foreignKey:"UserID"})
Loan.belongsTo(TypeLoan, {foreignKey:"type_loanID"})
// Loan.belongsTo(Empleado,{foreignKey:"empleadoID"})