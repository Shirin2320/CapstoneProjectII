import { Column, DataType, Model, Table} from "sequelize-typescript";
import ICategories from "../Interface/Categories";

@Table({
    tableName: "categories",
    timestamps: false,
})

export default class Categories extends Model<Categories> implements ICategories {
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
    name!: string;
}