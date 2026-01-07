'use client';

import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { Box, Button, LinearProgress } from '@mui/material';
import { Radio, RadioGroup } from '@headlessui/react';
import ProductReviewCard from './ProductReviewCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../../State/Product/Action';
import { addItemToCart } from '../../../State/Cart/Action';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector((store) => store.product);

  let Excellent = 0;
  let VeryGood = 0;
  let Good = 0;
  let Average = 0;
  let Poor = 0;

  function calculateRatings() {
    Excellent = 0;
    VeryGood = 0;
    Good = 0;
    Average = 0;
    Poor = 0;
    if (!product || !product.ratings) return;
    const totalReviews = product.ratings.length;
    product.ratings.forEach((rate) => {
      if (rate.rating >= 4) Excellent++;
      else if (rate.rating < 4 && rate.rating >= 3) VeryGood++;
      else if (rate.rating < 3 && rate.rating >= 2) Good++;
      else if (rate.rating < 2 && rate.rating >= 1) Average++;
      else if (rate.rating < 1) Poor++;
    });
  }

  useEffect(() => {
    dispatch(findProductsById(productId));
    if (product?.ratings)
      calculateRatings();
  }, [dispatch, productId]);

  const handleAddtoCart = () => {
    if (!selectedSize) {
      
      alert('Please select a size');
      return;
    }
    console.log(selectedSize);
    dispatch(addItemToCart({ productId, size: selectedSize, quantity: 1 ,price: product.discountedPrice }));
    navigate('/cart');
  };

  // Loading state
  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-semibold">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="bg-white lg:px-20">
      {/* ---------------- IMAGE & INFO SECTION ---------------- */}
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 pt-10">
        {/* Image Gallery */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {product.images?.map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg w-20 h-20 border"
              >
                <img
                  src={img.src}
                  alt={img.alt || 'product'}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="text-left max-w-2xl">
          <h1 className="text-xl font-semibold">{product.brand}</h1>
          <p className="text-lg opacity-60">{product.title}</p>

          {/* Price */}
          <div className="flex items-center gap-5 mt-6 text-lg">
            <p className="font-semibold">₹{product.discountedPrice}</p>
            <p className="line-through opacity-50">₹{product.price}</p>
            <p className="text-green-600 font-semibold">
              {product.discountPercent}% off
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-3 mt-4">
            <Rating value={product.ratings?.rating ?? 4.5} readOnly />
            <p className="text-sm opacity-60">{product.numRatings ?? 0} Ratings</p>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="font-medium mb-3">Size</h3>
            <RadioGroup
              value={selectedSize}
              onChange={setSelectedSize}
              className="grid grid-cols-4 gap-3"
            >
              {product.sizes?.map((size) => (
                <Radio
                  key={size.name}
                  value={size.name}
                  disabled={size.quantity <= 0} // disable if quantity is 0
                  className={classNames(
                    size.quantity > 0
                      ? 'cursor-pointer bg-white text-gray-900'
                      : 'cursor-not-allowed bg-gray-100 text-gray-400',
                    'flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium uppercase'
                  )}
                >
                  {size.name}
                </Radio>

              ))}
            </RadioGroup>
            {
              selectedSize && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected Size: {selectedSize}
                </p>
              )
            }
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddtoCart}
            color="secondary"
            variant="contained"
            sx={{ px: '2rem', py: '1rem', mt: '1.5rem' }}
          >
            Add To Cart
          </Button>

          {/* Description */}
          <section className="px-4 lg:px-0 mt-16 text-left">
            <h2 className="font-semibold text-lg mb-4">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </section>
        </div>
      </section>

      {/* ---------------- REVIEWS SECTION ---------------- */}
      <section className="mt-16 px-4 lg:px-0 text-left">
        <h1 className="font-semibold text-lg mb-4">Recent Reviews & Ratings</h1>

        <div className="border p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Reviews List */}
            <div className="md:col-span-7">
              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, i) => (
                    <ProductReviewCard key={i} review={review} />
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>

            {/* Rating Summary */}
            <div className="md:col-span-5">
              <h2 className="text-xl font-semibold mb-2">Product Rating</h2>
              <div className="flex items-center gap-3 mb-6">
                <Rating value={product.ratings?.rating ?? 4.5} readOnly />
                <p className="text-sm opacity-60">{product.numRatings ?? 0}</p>
              </div>

              {/* Rating Bars */}
              <div className="space-y-4">
                {
                  [
                    ['Excellent', Excellent, 'success'],
                    ['Very Good', VeryGood, 'success'],
                    ['Good', Good, 'primary'],
                    ['Average', Average, 'warning'],
                    ['Poor', Poor, 'error'],
                  ].map(([label, value, color]) => (
                    <div key={label} className="grid grid-cols-12 items-center gap-3">
                      <div className="col-span-4 text-sm">{label}</div>
                      <div className="col-span-8">
                        <LinearProgress
                          variant="determinate"
                          value={value}
                          color={color}
                          sx={{ height: 7, borderRadius: 4, bgcolor: '#e0e0e0' }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


