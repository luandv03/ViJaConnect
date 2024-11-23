import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  location: { type: String },
  date: { type: Date, required: true },
  banner_link: { type: String },
});

export const Event = mongoose.model("event", eventSchema);
