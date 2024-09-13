import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";
import { DATE } from "sequelize";
import { ActiveStatus } from "../constant/common.js";

class UserRole extends Model {}

UserRole.init(
  {
    UserRoleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [ActiveStatus.ACTIVE, ActiveStatus.INACTIVE],
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    timestamps: false,
  }
);

export default UserRole;
