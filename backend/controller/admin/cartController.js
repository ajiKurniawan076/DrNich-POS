import asyncHandler from "express-async-handler";
import Cart from "../../models/cart/cart.js";
import Produk from "../../models/produk/produk.js";

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Produk.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne();

  if (!cart) {
    cart = await Cart.create({ items: [{ productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    j;
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  res.status(200).json(cart);
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne().populate("items.productId");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json(cart);
});

const clearCart = asyncHandler(async (req, res) => {
  await Cart.deleteMany();
  res.status(200).json({ message: "Cart cleared" });
});

export { addToCart, getCart, clearCart };
