const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrderStatus,
  getOrderById,
  getAllOrders,
} = require("../controller/ordersController");
const { protect } = require("../middleware/protect");

router.post("/orders", createOrder);
router.patch("/orders/:id", updateOrderStatus);
router.get("/orders/:id", getOrderById);
router.get("/orders", getAllOrders);

module.exports = router;
