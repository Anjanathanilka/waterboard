import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";

class BasicDetails extends Model {}

BasicDetails.init(
  {
    BasicDetailsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NameWithInitials: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NameDenotedbyInit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OtherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NIC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CivilStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Religion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AddressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AddressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ethnicity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MobileNo1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MobileNo2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsChecked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ApplicationBasicDetails",
    timestamps: true,
  }
);

export default BasicDetails;
