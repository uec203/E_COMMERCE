import React, { Component } from 'react';
import MainCarousel from '../../Components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../Components/HomeSectionCarousel/HomeSectionCarousel';
import { findProducts, getCategories, loadProductsByCategory } from '../../../State/Product/Action';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';





const HomePage = () => {

  const dispatch = useDispatch();
  const productsByCategory = useSelector(store => store.product.productsByCategory);
  let categories = useSelector(store => store.product.category);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    categories.forEach((category) => {
      dispatch(loadProductsByCategory(category.name));
    });
  }, [categories]);

  return (
    <div >
      <MainCarousel />
      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        {categories.map((category) => {

          let products = productsByCategory[category.name] || [];
          console.log("Products for category", category.name, ":", products);
          return (
            <HomeSectionCarousel key={category.name} item={{ title: category.name, products: products }} />
          );
        })}
      </div>
    </div>

  );
}

export default HomePage;