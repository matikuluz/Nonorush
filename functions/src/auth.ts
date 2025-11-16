import * as admin from "firebase-admin";
import { auth } from "firebase-functions/v1";

const db = admin.firestore();

export const onUserCreate = auth.user().onCreate(
  async (user: admin.auth.UserRecord) => {
    await db.doc(`users/${user.uid}`).set(
      {
        displayName: user.displayName ?? `player-${user.uid.slice(0, 6)}`,
        rating: 1200,
        gamesPlayed: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  }
);
