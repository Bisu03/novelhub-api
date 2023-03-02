const Announce = require("../models/announcementModel");

exports.postAnnounce = async (req, res) => {
  const Check = req.user;
  console.log(req.body);
  const { title, desc, date } = req.body;
  if (Check.role == "Admin" || Check.role == "SuperAdmin") {
    await Announce.create({ userId: Check._id, title, desc, date });
    return res.status(200).json({ message: "Announcement Publiced" });
  } else {
    return res.status(400).json({ error: "You are not permited" });
  }
};

exports.getAnnounce = async (req, res) => {
  const keyWord = req.query.search
    ? {
        $or: [{ title: { $regex: req.query.search, $options: "i" } }],
      }
    : {};
  const accounce = await Announce.find(keyWord)
    .populate({ path: "userId" })
    .sort("-createdAt")
  return res.status(200).json(accounce);
};

exports.deleteAnnounce = async (req, res) => {
  try {
    const Check = req.user;
    if (Check.role == "Admin" || Check.role == "SuperAdmin") {
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
