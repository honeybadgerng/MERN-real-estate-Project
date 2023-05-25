const Property = require("../models/Property");
const propertyController = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

//get all
propertyController.get("/get", async (req, res) => {
  try {
    const properties = await Property.find({});

    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
//get featured
propertyController.get("/find/featured", async (req, res) => {
  try {
    const featuredProperties = await Property.find({ featured: true }).populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(featuredProperties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
//get all from specific type
propertyController.get("/find", async (req, res) => {
  const type = req.query;
  // apartment/land/hose/commercialprop
  try {
    if (type) {
      const properties = await Property.find(type).populate(
        "currentOwner",
        "-password"
      );
      return res.status(200).json(properties);
    } else {
      return res.status(500).json({ msg: "No such property type" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
// get count from types eg  apartment = 5, commercial property=16

propertyController.get("/find/types", async (req, res) => {
  try {
    const apartmentType = await Property.countDocuments({ type: "apartment" });
    const houseType = await Property.countDocuments({ type: "house" });
    const landType = await Property.countDocuments({ type: "land" });
    const commercialPropertyType = await Property.countDocuments({
      type: "commercialProperty",
    });
    return res.status(200).json({
      apartment: apartmentType,
      house: houseType,
      land: landType,
      commercialProperty: commercialPropertyType,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get individual property
propertyController.get("/find/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "currentOwner",
      "-password"
    );
    if (!property) {
      throw new Error("No such property with this Id");
    } else {
      return res.status(200).json(property);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// create a new property
propertyController.post("/", verifyToken, async (req, res) => {
  try {
    const newProperty = await Property.create({
      ...req.body,
      currentOwner: req.user.id,
    });

    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// update property
propertyController.put("/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.currentOwner.toString() !== req.user.id) {
      throw new Error("you no fit update person property");
    } else {
      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedProperty);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// delete a property
propertyController.delete("/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property.currentOwner.toString() !== req.user.id) {
      throw new Error("you nor fit delete person property");
    } else {
      await property.delete();

      return res.status(200).json({ msg: "successfully deleted property" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = propertyController;
