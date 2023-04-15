import User from "../../Models/User/User";
const createUser = async (userData: any) => {
  if (userData !== undefined && userData !== null) {
    return await User.create(userData);
  } else {
    throw new Error("userData parameter is undefined or null");
  }
};

const getUserById = async (id: number) => {
  return User.findOne({ id })
    .populate([
      { path: "workspaces" },
      { path: "workspaceMember" },
      { path: "taskAssignees" },
      { path: "comments" },
      { path: "settings" },
      { path: "projectMember" },
    ])
    .select("-password_hash -__v");
};

const getAllUsers = async () => {
  return User.find();
};

const updateUser = async (id: number, userData: any) => {
  return User.updateOne({ id }, userData);
};

const deleteUser = async (id: number) => {
  return User.deleteOne({ id });
};

const getUserByEmail = async (email: string): Promise<any | null> => {
  try {
    const user = await User.findOne({ email: email }).select(
      "-password_hash -__v"
    );
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserByUsername = async (username: string) => {
  return User.findOne({ username }).select("-password_hash -__v");
};

const updatePasswordResetToken = async (userId: number, token: string) => {
  return User.updateOne({ id: userId }, { passwordResetToken: token });
};

const getUserByPasswordResetToken = async (token: string) => {
  return User.findOne({ password_reset_token: token });
};

const updatePassword = async (userId: number, newPasswordHash: string) => {
  return User.updateOne(
    { id: userId },
    { password_hash: newPasswordHash, password_reset_token: null }
  );
};

export {
  getUserByPasswordResetToken,
  updatePassword,
  updatePasswordResetToken,
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByUsername,
};
