import { DataTypes, Model } from 'sequelize';
import sequelize from "../../../config/db";
import User from './User';

class Asset extends Model {
  // Definição das propriedades do modelo Asset
  public username!: string;
  public ticker!: string;
  public quantity!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Asset.init(
  {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        references: {
            model: User,
            key: 'username',
        },
    },
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'assets',
    timestamps: true,
    underscored: true
  }
);

export default Asset;