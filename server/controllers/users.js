import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id).populate("friends");
    const friends = result.friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(friends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    const friendIndex = user.friends.indexOf(friendId);

    if (friendIndex !== -1) {
      // Friend is already present, so remove them
      user.friends.splice(friendIndex, 1);

      const userIndex = friend.friends.indexOf(id);
      if (userIndex !== -1) {
        // Remove the user from the friend's friend array
        friend.friends.splice(userIndex, 1);
        await friend.save();
      }
    } else {
      // Friend is not present, so add them
      user.friends.push(friendId);

      if (!friend.friends.includes(id)) {
        // Add the user to the friend's friend array
        friend.friends.push(id);
        await friend.save();
      }
    }

    await user.save();

    const result = await User.findById(id).populate("friends");
    const friends = result.friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
