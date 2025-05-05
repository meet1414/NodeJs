const Category = require("../models/category.model");
const ExtraCategory = require("../models/extraCategory.model");
const SubCategory = require("../models/subCategory.model");
const Product = require("../models/product.model");

exports.addProductPage = async (req, res) => {
    try {
        const categories = await Category.find();
        const subcategories = await SubCategory.find();
        const extracategories = await ExtraCategory.find();
        return res.render("Product/add_product", {
            categories,
            subcategories,
            extracategories,
        });
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong!");
        return res.redirect("back");
    }
};
exports.addNewProduct = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        req.body.productImage = imagePath;
        await Product.create(req.body);

        req.flash("success", "New Product Added.");
        return res.redirect("back");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong!");
        return res.redirect("back");
    }
};
exports.getAllProducts = async (req, res) => {
    const { category, search } = req.query;
    let filter = {};

    if (category && category !== "") {
        filter.category = category;
    }

    if (search && search.trim() !== "") {
        filter.$or = [
            { title: { $regex: search.trim(), $options: "i" } },
            { desc: { $regex: search.trim(), $options: "i" } }
        ];
    }

    try {
        const categories = await Category.find();
        const allProducts = await Product.find(filter)
            .populate("category")
            .populate("subcategory")
            .populate("extracategory");

        return res.render("Product/view_product", {
            allProducts,
            categories,
            selectedCategory: category || "",
            search: search || ""
        });
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong!");
        return res.redirect("back");
    }
};
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category")
            .populate("subcategory")
            .populate("extracategory");

        return res.render("Product/single_product", { product });
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong!");
        return res.redirect("back");
    }
};
exports.editProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const categories = await Category.find();
        const subcategories = await SubCategory.find();
        const extracategories = await ExtraCategory.find();

        return res.render("Product/edit_product", {
            product,
            categories,
            subcategories,
            extracategories,
        });
    } catch (error) {
        console.error(error);
        req.flash("error", "Error loading product for editing");
        return res.redirect("back");
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (req.file) {
            updateData.productImage = `/uploads/${req.file.filename}`;
        }

        await Product.findByIdAndUpdate(req.params.id, updateData);
        req.flash("success", "Product Updated Successfully");
        return res.redirect("/product/view-product");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong during update");
        return res.redirect("back");
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        req.flash("success", "Product Deleted");
        return res.redirect("/product/view-product");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong during deletion");
        return res.redirect("back");
    }
};
