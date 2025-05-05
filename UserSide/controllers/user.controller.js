const Category = require("../models/category.model");
const Product = require("../models/product.model");
const User=require("../models/user.model")
exports.userPage = async (req, res) => {
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

      return res.render("index", {
          categories,
          allProducts,
          selectedCategory: category || "",
          search: search || ""
      });
  } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong while fetching products!");
      return res.redirect("back");
  }
};

exports.singleProduct = async (req, res) => {
  try {
      const product = await Product.findById(req.params.id)
          .populate("category")
          .populate("subcategory")
          .populate("extracategory");

      return res.render("get_product", { product });
  } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong while fetching the product!");
      return res.redirect("back");
  }
};

exports.Adduser = async (req, res) => {
    try {
        let admin = await User.create(req.body);
        console.log("User Added Success");
        return res.redirect("back");
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
}

exports.showRegister = (req, res) => {
  console.log("Register route hit");
  res.render("auth/register");
};

exports.showLogin = (req, res) => {
  res.render("auth/login");
};

exports.addToCart = async (req, res) => {
    try {
      const productId = req.params.id;
  
      if (!req.session.cart) {
        req.session.cart = [];
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      const cartItemIndex = req.session.cart.findIndex(item => item.productId.toString() === productId);
      if (cartItemIndex > -1) {
        req.session.cart[cartItemIndex].quantity += 1;
      } else {
        req.session.cart.push({
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.productImage,
          quantity: 1,
        });
      }
  
      return res.redirect("/user/cart");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error adding to cart" });
    }
  };
  
  exports.viewCart = (req, res) => {
    const cart = req.session.cart || [];
    res.render("user/cart", { cart }); 
  };
  
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            if (user.password === password) {
                return res.redirect("/user");
            } else {
                console.log("Password Not Match");
                return res.redirect("/");
            }
        } else {
            console.log("User Not Found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};

let wishlist = []; 

exports.getWishlist = (req, res) => {
    res.render('user/wishlist', {
        title: 'My Wishlist',
        wishlist
    });
};

exports.addToWishlist = (req, res) => {
    const { id } = req.params;

    const product = {
        id,
        title: `Sample Product ${id}`,
        price: 999 + parseInt(id),
        image: 'https://via.placeholder.com/300x200?text=Product+' + id
    };

    const exists = wishlist.find(item => item.id === id);
    if (!exists) wishlist.push(product);

    res.redirect('/user/wishlist');
};

exports.removeFromWishlist = (req, res) => {
    const { id } = req.params;
    wishlist = wishlist.filter(item => item.id !== id);
    res.redirect('/user/wishlist');
};
