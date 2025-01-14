import crypto from "node:crypto";

/**
 * @returns {Object} The verifier and challenge strings
 */
export const generatePKCE = () => {
   const verifier = crypto.randomBytes(32).toString("base64url");

   const challenge = crypto
      .createHash("sha256")
      .update(verifier)
      .digest("base64url");

   // console.log('verifier:', verifier);
   // console.log('challenge:', challenge);
   
   return { verifier, challenge };
};