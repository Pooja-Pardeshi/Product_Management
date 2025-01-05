const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');

// Create Product
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Products with Pagination
router.get('/', async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    const limit = parseInt(size);
    const offset = (page - 1) * limit;

    try {
        const products = await Product.findAndCountAll({
            include: { model: Category, attributes: ['id', 'name'] },
            limit,
            offset,
        });
        res.json({
            total: products.count,
            totalPages: Math.ceil(products.count / limit),
            currentPage: parseInt(page),
            data: products.rows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a Single Product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: { model: Category, attributes: ['id', 'name'] },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
