import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.js";

//process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9095";

if (process.env.NODE_ENV === "development") {
  admin.initializeApp({
    projectId: "indieverse-7d904",
  });
  console.log(admin.app().options.projectId);
} else {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();
const auth = admin.auth();

if (process.env.NODE_ENV === "development"){
  db.settings({
    host: "127.0.0.1:8080",
    ssl: false,
  });
}

export { auth, db };
