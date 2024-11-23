import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Loan } from "./loan";

export class Amortization extends Model {
    public LoansID!: number;
    public date!: Date;
    public amount!: number;
    public state!: boolean;
}

export interface AmortizationI {
    LoansID: number;
    date: Date;
    amount: number;
    state: boolean;
}

Amortization.init({
    LoansID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: "Amortization",
    sequelize: database,
    timestamps: false
});
Amortization.belongsTo(Loan,{foreignKey:"LoanID"})