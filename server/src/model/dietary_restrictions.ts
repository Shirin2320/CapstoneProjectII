import { BelongsTo, Column, DataType, Model, Table} from "sequelize-typescript";
import IDietary_Restrictions from "../Interface/Dietary_Restrictions";
import User from "./user.js"

@Table({
    tableName: "dietary restrictions",
    timestamps: false,
})

export default class Dietary_Restrictions extends Model<Dietary_Restrictions> implements IDietary_Restrictions {
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
    name!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    ingredient_id!: number;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: true
    })
    user_ids!: []

    @BelongsTo(() => User, "user_ids") user!: User;
}