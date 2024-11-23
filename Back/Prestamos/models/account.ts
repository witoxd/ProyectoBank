import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { User } from "./User";
import { TypeAccount } from "./types_account";

export class Account extends Model {
    public UserID!: number;
    public number!: number;
    public TypeAccountID!: number;
    public current_balance!: number;
}

export interface AccountI {
    UserID: number;
    number: number;
    TypeAccountID: number;
    current_balance: number;
}

Account.init({
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TypeAccountID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    current_balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: "Account",
    sequelize: database,
    timestamps: false
});
Account.belongsTo(User,{foreignKey:"UserID"})
Account.belongsTo(TypeAccount, {foreignKey: "TypeAccountID"})