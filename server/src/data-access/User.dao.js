import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";
import UserRole from "../models/UserRole.js";

class UserDao {
  static async createUser(userData) {
    try {
      const user = await UserModel.create(userData);
      return user;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  static async getUserById(userId) {
    try {
      const user = await UserModel.findByPk(userId);
      return user;
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't find user`);
    }
  }

  static async getUserByName(userName) {
    try {
      const user = await UserModel.findOne({
        where: { UserName: `${userName}` },
      });
      return user;
    } catch (error) {
      console.log(e);
      throw new Error(`Couldn't find user`);
    }
  }

  static async getUserByEmail(req) {
    const { userName, password } = req.body;
    try {
      // const user = await UserModel.findAll({
      //   include: {
      //     model: UserRole,
      //     required: true,
      //   },
      //   where: { EmailAddress: `${email}` },
      // });
      // return user;
      let queryString = `SELECT [UserAccount].[UserId], [UserAccount].[UserRoleId], [UserAccount].[UserName], [UserAccount].[Password], [UserAccount].[EmailAddress], [UserAccount].[MobileNo], [UserAccount].[EmpNumber], [UserAccount].[NIC], [UserAccount].[IsEmployee], [UserAccount].[createdAt], [UserAccount].[updatedAt],  [UserRole].[UserRole] 
      FROM [UserAccounts] [UserAccount]
      INNER JOIN [UserRoles] AS [UserRole] ON [UserAccount].[UserRoleId] = [UserRole].[UserRoleId] 
      WHERE [UserAccount].[EmailAddress] = '${userName}'`;
      const results = await req.app.locals.db.query(queryString);
      return results.recordset[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Couldn't find user`);
    }
  }
  // where: { EmailAddress: `${email}` },

  static async getUserByNameOrEmail(userName, EmailAddress) {
    try {
      const user = await UserModel.findAll({
        where: {
          [Op.or]: [
            { UserName: `${userName}` },
            { EmailAddress: `${EmailAddress}` },
          ],
        },
      });
      return user;
    } catch (error) {
      console.log(e);
      throw new Error(`Couldn't find user`);
    }
  }
}

export default UserDao;
