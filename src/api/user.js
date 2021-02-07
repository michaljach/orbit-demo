import sha3 from "crypto-js/sha3";

export const registerUser = async (db, email, password) => {
  const passwordHash = sha3(password);
  const hash = await db.put({
    _id: email,
    name: "yaszko",
    password: passwordHash,
  });
  return hash;
};

export const getUser = async (db, email) => {
  const user = await db.get(email);
  return user;
};
