import jwt from "jsonwebtoken";

// check the validity of token

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // custom auth or google auth

    let decodeData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.userId = decodeData?.UserId;
    } else {
      // google auth
      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub;
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "session expired" });
    console.log(error);
  }
};

export default auth;
