const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    return res.json(category);
  } catch (err) {
    //   console.log(err)
    return res.status(400).send("Create Category Failed");
  }
};

exports.list = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return res.json(categories);
  } catch (err) {}
};

exports.read = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    return res.json(category);
  } catch (err) {}
};

exports.update = async (req, res, next) => {
  const { name } = req.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.json(updatedCategory);
  } catch (err) {
    return res.status(400).send("Update Category Failed");
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    return res.json(deletedCategory);
  } catch (err) {
    return res.status(400).send("Delete Category Failed");
  }
};
