/*
  File: functions/index.js
  This is the backend file with the dedicated 'bulkAddArtists' function.
*/

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Creates multiple artist accounts from a CSV file.
 * This is now a secure 'onCall' function, which handles CORS automatically.
 */
exports.bulkAddArtists = functions.https.onCall(async (data, context) => {
  // Security Check: Ensure the user calling the function is an admin.
  // This requires you to have custom claims set up for your admin user.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to perform this action."
    );
  }
  if (context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied', 
      'This function can only be called by an admin.'
    );
  }

  const artists = data.artists;
  if (!artists || !Array.isArray(artists)) {
    throw new functions.https.HttpsError(
      'invalid-argument', 
      "Invalid data format. Expected an 'artists' array."
    );
  }

  let successCount = 0;
  const errorDetails = [];

  const creationPromises = artists.map(async (artist) => {
    try {
      const userRecord = await admin.auth().createUser({
        email: artist.email,
        password: "vnrvjiet@123", // Users should change this on first login
        displayName: artist.name,
      });

      await admin.firestore().collection("artists").doc(userRecord.uid).set({
        uid: userRecord.uid,
        name: artist.name,
        email: artist.email,
        domain: artist.domain,
        graduationYear: Number(artist.graduationYear),
        role: "member", // All bulk-added users are members
        bio: "",
        profileImageUrl: "",
      });
      return { status: "fulfilled" };
    } catch (error) {
      return { status: "rejected", reason: `Failed for ${artist.email}: ${error.message}` };
    }
  });

  const results = await Promise.allSettled(creationPromises);

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      successCount++;
    } else {
      errorDetails.push(result.reason);
    }
  });

  // Return the result to the client
  return {
    status: "complete",
    message: `Successfully created ${successCount} of ${artists.length} artists.`,
    errors: errorDetails,
  };
});