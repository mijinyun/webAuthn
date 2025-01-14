// // @ts-nocheck
// export const database = {
//   users: new Map(),

//   getUserByEmail(email) {
//     return Array.from(this.users.values()).find((user) => user.email === email);
//   },

//   saveUser(user) {
//     this.users.set(user.id, user);
//   },

//   saveChallenge(userID, challenge) {
//     const user = this.users.get(userID);
//     if (user) {
//       user.challenge = challenge;
//     }
//   },

//   getChallenge(userID) {
//     return this.users.get(userID)?.challenge;
//   },

//   saveCredential(userID, credential) {
//     const user = this.users.get(userID);
//     if (user) {
//       user.credentials = [...(user.credentials || []), credential];
//     }
//   }
// };
