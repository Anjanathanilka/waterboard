import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";

class EduDetails extends Model {}

EduDetails.init(
  {
    eduDetailsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eduTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instituteName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fieldOfStudy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attachmentPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ApplicationEduDetails",
    timestamps: true,
  }
);

export default EduDetails;
