import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    text: { type: String, required: true },
});

export const Location = mongoose.model("location", locationSchema);
