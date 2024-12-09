import { User } from "../models/user.model";

export const getUserContacts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate({
      path: "contacts",
      populate: [
        { path: "contact_id", model: "user" },
        { path: "group_id", model: "chat_group" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
