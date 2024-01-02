// pages/api/orders.js

import { mongooseConnect } from '../../lib/mongoose';
import Order from '../../models/order';

// Connect to MongoDB
await mongooseConnect();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // GET: Get all orders
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // POST: Create a new order
    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

// Additional routes for getting orders for userTo and userFrom
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase body size limit if needed
    },
  },
};

export const getUserToOrders = async function handler(req, res) {
  if (req.method === 'GET') {
    // GET: Get all orders for a specific userTo
    try {
      const { userId } = req.query;
      const orders = await Order.find({ userTo: userId });
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders for userTo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    // DELETE: Delete an order by ID
    try {
      const { orderId } = req.query;
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ message: 'Order deleted successfully', deletedOrder });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export const getUserFromOrders = async function handler(req, res) {
  if (req.method === 'GET') {
    // GET: Get all orders for a specific userFrom
    try {
      const { userId } = req.query;
      const orders = await Order.find({ userFrom: userId });
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders for userFrom:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
