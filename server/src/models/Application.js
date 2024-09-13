import { DataTypes, Model } from "sequelize";
import sequelize from "../../db-connect-seq.js";
import { ApplicationStatus } from "../constant/common.js";

class Application extends Model {}

Application.init(
  {
    ApplicationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ApplicationRefNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    VacancyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM,
      values: [
        ApplicationStatus.PENDING,
        ApplicationStatus.SELECTED,
        ApplicationStatus.REJECTED,
      ],
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Application",
    createdAt: "AppliedDate",
  }
);

export default Application;
