import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
  const { ProductName, Category, Qty, Date, Image } = req.body;
  const ProductID = `PD-${Date.now()}`;
  try {
    const newProduct = new Product({ ProductID, ProductName, Category, Qty, Date, Image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
