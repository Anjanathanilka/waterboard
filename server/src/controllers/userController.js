import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserDao from "../data-access/User.dao.js";
import UserModel from "../models/UserModel.js";

export const signup = async (req, res) => {
  const {
    userName,
    email,
    mobileNo,
    password,
    IsBoardEmployee,
    empNumber,
    nic,
  } = req.body;
  try {
    const olduser = await UserDao.getUserByEmail(req);

    if (olduser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      UserName: userName,
      Password: hashedPassword,
      EmailAddress: email,
      MobileNo: mobileNo,
      EmpNumber: empNumber,
      NIC: nic,
      IsEmployee: IsBoardEmployee,
      UserRoleId: 1,
    });

    const token = jwt.sign(
      { email: result.EmailAddress, id: result._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    console.log("user request " + req);
    const oldUser = await UserDao.getUserByEmail(req);

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const { UserName, EmailAddress, UserId, UserRole } = oldUser;

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.Password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        EmailAddress,
        UserName,
        UserId,
        UserRole,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 1200, // 60 seconds
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// ... existing code ...

export const adminSignin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Call the Water Board HRM API
    const response = await fetch('https://billing.waterboard.lk/hrm/Authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Create admin token with special privileges
    const token = jwt.sign(
      {
        userName,
        isAdmin: true,
        // Add any additional admin data from the HRM API response
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 1200,
      }
    );

    res.status(200).json({ 
      result: {
        UserName: userName,
        isAdmin: true,
        // Add any additional admin data you want to return
      }, 
      token 
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};