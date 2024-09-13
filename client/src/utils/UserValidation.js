import decode from "jwt-decode";

const getValidatedUserData = (data) => {
  let validatedData = data;
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  try {
    const decodedToken = decode(token);

    if (decodedToken.exp > Date.now() / 1000) {
      validatedData = JSON.parse(localStorage.getItem("profile"))?.userData;
    } else {
      localStorage.clear();
      validatedData = null;
    }
  } catch (e) {
    validatedData = null;
  }
  return { data: validatedData, token: token };
};

export { getValidatedUserData };
