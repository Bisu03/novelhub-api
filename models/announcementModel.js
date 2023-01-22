const mongoose = require("mongoose");
// announcement schema
const announcementScheama = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      require: true,
      type: String,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementScheama);
