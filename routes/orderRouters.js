const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrderStatus,
  getOrderById,
  getAllOrders,
} = require("../controller/ordersController");
const { protect } = require("../middleware/protect");

router.post("/orders", protect, createOrder);
router.patch("/orders/:id", protect, updateOrderStatus);
router.get("/orders/:id", protect, getOrderById);
router.get("/orders", protect, getAllOrders);

module.exports = router;
