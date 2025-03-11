const {
  createOrder,
  updateOrderStatus,
  getOrderById,
  getAllOrders,
} = require("../services/orderCrud");

const { errorHandler, responseMessage } = require("../utils/errorHandler");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Ensure userId is defined
    const { products } = req.body;

    const order = await createOrder(userId, products);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await updateOrderStatus(req.params.id, req.body.status);
    res.status(201).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrders(req.query);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: orders,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};
