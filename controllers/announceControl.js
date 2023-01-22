const Announce = require("../models/announcementModel");

exports.postAnnounce = async (req, res) => {
  const Check = req.user;
  const { title, desc } = req.body;
  if (Check.role == "Admin" || Check.role == "superAdmin") {
    await Announce.create({ userId: Check._id, title, desc });
    return res.status(200).json({ message: "Announcement Publiced" });
  } else {
    return res.status(400).json({ error: "You are not permited" });
  }
};

exports.getAnnounce = async (req, res) => {
  const accounce = await Announce.find({});
  return res.status(200).json(accounce);
};

exports.deleteAnnounce = async (req, res) => {
  try {
    const Check = req.user;
    if (Check.role == "Admin" || Check.role == "superAdmin") {
      const { id } = req.params;
      await Announce.findByIdAndDelete(id);
      return res.status(200).json({ message: "Announcement Deleted" });
    } else {
      return res.status(400).json({ error: "You are not permited" });
    }
  } catch (error) {
    return res.status(400).json({ error: "somethig went wrong" });
  }
};
