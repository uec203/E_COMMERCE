import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';

const initialSizes = [
  { name: 'S', quantity: 0 },
  { name: 'M', quantity: 0 },
  { name: 'L', quantity: 0 },
];

const CreateProductForm = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    imageUrl: '',
    brand: '',
    title: '',
    color: '',
    price: 0,
    discountedPrice: 0,
    discountPercent: 0,
    sizes: initialSizes,
    quantity: 0,
    topLevelCategory: '',
    secondLevelCategory: '',
    thirdLevelCategory: '',
    description: '',
  });

  // General input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Handle sizes
  const handleSizeChange = (e, index) => {
    const { name, value, type } = e.target;
    setProductData((prev) => {
      const sizes = [...prev.sizes]; // fix here
      sizes[index][name === 'size_quantity' ? 'quantity' : name] =
        type === 'number' ? Number(value) : value;

      // Update total quantity
      const quantity = sizes.reduce((acc, size) => acc + size.quantity, 0);

      return { ...prev, sizes: sizes, quantity: quantity };
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Product:', productData);
    dispatch(createProduct(productData));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Product
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Row 1: Image URL & Brand */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <TextField
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              sx={{ flex: '1 1 48%' }}
            />
            <TextField
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              sx={{ flex: '1 1 48%' }}
            />
          </div>

          {/* Row 2: Title & Color */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <TextField
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              sx={{ flex: '1 1 48%' }}
            />
            <TextField
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
              sx={{ flex: '1 1 48%' }}
            />
          </div>

          {/* Row 3: Price, Discount Percent, Quantity */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              sx={{ flex: '1 1 22%' }}
            />
            <TextField
              label="Discount Percent"
              name="discountPercent"
              type="number"
              value={productData.discountPercent}
              onChange={handleChange}
              sx={{ flex: '1 1 22%' }}
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              disabled
              value={productData.quantity}
              sx={{ flex: '1 1 22%' }}
            />
          </div>

          {/* Row 4: Categories */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <FormControl sx={{ flex: '1 1 30%' }} variant="outlined">
              <InputLabel id="top-level-category-label">Top Level Category</InputLabel>
              <Select
                labelId="top-level-category-label"
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ flex: '1 1 30%' }} variant="outlined">
              <InputLabel id="second-level-category-label">Second Level Category</InputLabel>
              <Select
                labelId="second-level-category-label"
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ flex: '1 1 30%' }} variant="outlined">
              <InputLabel id="third-level-category-label">Third Level Category</InputLabel>
              <Select
                labelId="third-level-category-label"
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
              >
                <MenuItem value="Tops">Tops</MenuItem>
                <MenuItem value="Woman Dress">Woman Dresses</MenuItem>
                <MenuItem value="T-Shirts">T-Shirts</MenuItem>
                <MenuItem value="Saree">Saree</MenuItem>
                <MenuItem value="Length Choli">Length Choli</MenuItem>
                <MenuItem value="Mens Kurta">Mens Kurta</MenuItem>
                <MenuItem value="Watches">Watches</MenuItem>
                <MenuItem value="Wallets">Wallets</MenuItem>
                <MenuItem value="Bags">Bags</MenuItem>
                <MenuItem value="Sunglasses">Sunglasses</MenuItem>
                <MenuItem value="Hats">Hats</MenuItem>
                <MenuItem value="Belts">Belts</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Row 5: Description */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />

          {/* Row 6: Sizes */}
          <Typography variant="h6" gutterBottom>
            Sizes
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            {productData.sizes.map((size, index) => (
              <React.Fragment key={index}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(e) => handleSizeChange(e, index)}
                  sx={{ flex: '1 1 48%' }}
                />
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(e, index)}
                  sx={{ flex: '1 1 48%' }}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Submit Button */}
          <Button variant="contained" type="submit" fullWidth size="large">
            Add New Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateProductForm;
