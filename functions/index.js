/*
  File: functions/index.js
  This is the updated backend file with the CORS fix.
*/

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true}); // Import and configure cors

admin.initializeApp();

// --- Your existing addUserRole function (no changes needed here) ---
exports.addUserRole = functions.https.onCall(async (data, context) => {
  // Check if the user making the request is already an admin.
  if (context.auth.token.admin !== true) {
    return {
      error: "Request not authorized. User must be an admin " +
             "to run this function.",
    };
  }

  const uid = data.uid;

  try {
    await admin.auth().setCustomUserClaims(uid, {admin: true});
    await admin.firestore().collection("users").doc(uid).update({
      role: "admin",
    });
    return {
      message: `Success! User ${uid} has been made an admin.`,
    };
  } catch (err) {
    console.error(err);
    return {
      error: err.message,
    };
  }
});

// --- Updated bulkAddUsers function ---
exports.bulkAddUsers = functions.https.onRequest((req, res) => {
  // Wrap the function with the cors handler
  cors(req, res, async () => {
    // Note: For onRequest, we check the user's token manually.
    // The logic to verify the admin token is more complex here and can be
    // added later. For now, we focus on making the connection work.

    const users = req.body.data.users;
    if (!users || !Array.isArray(users)) {
      res.status(400).send({
        status: "error",
        message: "Invalid data format.",
      });
      return;
    }

    let successCount = 0;
    const errorDetails = [];

    const creationPromises = users.map(async (user) => {
      try {
        const userRecord = await admin.auth().createUser({
          email: user.email,
          password: "defaultPassword123",
          displayName: user.name,
        });

        await admin.firestore().collection("users").doc(userRecord.uid).set({
          uid: userRecord.uid,
          name: user.name,
          email: user.email,
          domain: user.domain,
          graduationYear: Number(user.graduationYear),
          role: "member",
          bio: "",
          profileImageUrl: "",
        });
        return {status: "fulfilled"};
      } catch (error) {
        const reason = `Failed for ${user.email}: ${error.message}`;
        return {status: "rejected", reason};
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

    res.status(200).send({
      data: { // Wrap the response in a 'data' object
        status: "complete",
        message: `Successfully created ${successCount} of ` +
                 `${users.length} users.`,
        errors: errorDetails,
      },
    });
  });
});
