import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import { notFound, errorHandler } from '../middleware/errorMiddleware.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  try{
    const {
      orderItems,
      shippingAddress,
      totalPrice,
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        totalPrice,
      })
  
      const createdOrder = await order.save()
  
      res.status(201).json(createdOrder)
    }
  } catch (err) {
    console.error(err.message);
    errorHandler(err, req, res);
  }
  
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  try{
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
    res.json(order);
} catch (err) {
  console.error(err.message);
  errorHandler(err, req, res);
}
})




// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  try{
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
  } catch (err) {
    console.error(err.message);
    errorHandler(err, req, res);
  }
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  try{
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
} catch (err) {
  console.error(err.message);
  errorHandler(err, req, res);
}
})

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
}