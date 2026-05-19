const User = require("../user/user.model");

const syncGoogleUser = async (firebaseUser) => {
  let user = await User.findOne({
    firebaseUid: firebaseUser.uid,
  });

  if (!user) {
    user = await User.create({
      firebaseUid: firebaseUser.uid,
      name: firebaseUser.name,
      email: firebaseUser.email,
      avatar: firebaseUser.picture,
      authProvider: "google",
    });
  }

  return user;
};

module.exports = {
  syncGoogleUser,
};