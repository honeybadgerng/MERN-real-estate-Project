const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 8,
    },
    marketStatus: {
      type: String,
      enum: ["available", "rented", "sold"],
      required: true,
    },
    category: {
      type: String,
      enum: ["rent", "sale", "short Let", "joint Venture"],
      required: true,
    },
    type: {
      type: String,
      enum: ["apartment", "house", "land", "commercialProperty"],
      required: true,
    },
    desc: {
      type: String,
      required: true,
      min: 20,
    },
    img: {
      type: String,
      required: true,
    },
    sqmeters: {
      type: Number,
      required: false,
    },
    locality: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required,
      min: 1,
    },
    subtype: {
      type: String,
      enum: ["Mini Flat(Room and parlour)", "Self Contain(Single Rooms)"],
      required: false,
    },
    toilets: {
      type: Number,
      min: 1,
    },
    bathrooms: {
      type: Number,
      min: 1,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    serviced: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
