const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Category = require('./models/category');
const Product = require('./models/product');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Category CRUD
app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
});

app.post('/categories', async (req, res) => {
    const category = await Category.create(req.body);
    res.json(category);
});

app.put('/categories/:id', async (req, res) => {
    await Category.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Category updated!' });
});

app.delete('/categories/:id', async (req, res) => {
    await Category.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Category deleted!' });
});

// Product CRUD with Pagination
app.get('/products', async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    const products = await Product.findAndCountAll({
        limit: parseInt(pageSize),
        offset: parseInt(offset),
        include: { model: Category, attributes: ['name'] },
    });
    res.json(products);
});

app.post('/products', async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

app.put('/products/:id', async (req, res) => {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Product updated!' });
});

app.delete('/products/:id', async (req, res) => {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Product deleted!' });
});

app.listen(3002, () => console.log('Server running on port 3002!'));
