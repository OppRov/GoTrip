import JSEncrypt from "jsencrypt";

const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

export const useEncrypt = (data) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encryptedData = encrypt.encrypt(data);
  return encryptedData;
};
