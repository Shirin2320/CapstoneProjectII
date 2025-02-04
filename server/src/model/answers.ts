import { Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import IAnswer from "../Interface/Answer";
import Categories from "./categories";

@Table({
    tableName: "answers",
    timestamps: false,
})

export default class Answer extends Model<Answer> implements IAnswer {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    answer!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    category_id!: number;

    @HasOne(() => Categories, "category_id") category!: Categories;
}