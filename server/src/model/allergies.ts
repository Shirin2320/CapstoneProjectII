import { BelongsTo, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import IAllergy from "../Interface/Allergy";
import User from "./user"

@Table({
    tableName: "allergies",
    timestamps: false,
})

export default class Allergies extends Model<Allergies> implements IAllergy {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: true
    })
    user_ids!: [];

    @BelongsTo(() => User, "user_ids") user!: User;
}