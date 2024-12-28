import { hashSync } from "bcrypt";
import { readFileSync } from "fs";
import crypto from "crypto";

export default (password: string): string => {
    try {
        const privateKey: string = readFileSync("RSA-keys/private.pem", "utf8");
        const decryptedPassword: Buffer = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(password, "base64")
        );

        return decryptedPassword.toString();
    } catch (err: any) {
        return `ERROR: ${err.toString()}`;
    }
}
