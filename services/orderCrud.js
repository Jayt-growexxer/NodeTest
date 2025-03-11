const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const { errorHandler, responseMessage } = require("../utils/errorHandler"); // Import reusable functions

const createOrder = async (userId, orderItems) => {
  try {
    if (!orderItems || orderItems.length === 0) {
      throw new Error("Order must contain at least one product");
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const { name: customerName, email: customerEmail } = user;

    let totalAmount = 0;
    const productsToOrder = [];
    const stockUpdates = []; // Track stock updates for rollback

    for (const item of orderItems) {
      const product1 = await Product.findById(item.product);
      if (!product1)
        throw new Error(`Product with ID ${item.product} not found`);
      if (product1.stock < item.quantity)
        throw new Error(`Not enough stock for product: ${product.name}`);

      // Deduct stock
      product1.stock -= item.quantity;
      stockUpdates.push({ product1, rollbackStock: item.quantity });

      await product1.save();

      productsToOrder.push({
        product: item.product,
        quantity: item.quantity,
      });
      totalAmount += product1.price * item.quantity;
    }

    // Create the order
    const order = new Order({
      customerName,
      customerEmail,
      products: productsToOrder,
      totalAmount,
    });

    await order.save();
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const updateOrderStatus = async (orderId, status, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) throw new Error("Order not found");
    return responseMessage(
      res,
      200,
      order,
      "Order status updated successfully",
      true
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};

const getOrderById = async (orderId, res) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    return responseMessage(
      res,
      200,
      order,
      "Order retrieved successfully",
      true
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};

const getAllOrders = async (query, res) => {
  try {
    const orders = await Order.find(query);
    return responseMessage(
      res,
      200,
      orders,
      "Orders retrieved successfully",
      true
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};

module.exports = { createOrder, updateOrderStatus, getOrderById, getAllOrders };
