import JSEncrypt from "jsencrypt";

const publicKey = `${import.meta.env.VITE_PUBLIC_KEY}`;

export const useEncrypt = (data) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encryptedData = encrypt.encrypt(data);
  return encryptedData;
};
