import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/products/${product.id}`)}
            className="cursor-pointer flex flex-col items-center bg-white 
                       rounded-lg shadow-lg overflow-hidden 
                       w-[15rem] mx-3 border
                       transition-transform duration-300 hover:scale-105"
        >
            {/* Image */}
            <div className="h-[13rem] w-full">
                <img
                    className="object-cover object-top w-full h-full"
                    src={product.imageUrl}
                    alt={product.title}
                />
            </div>

            {/* Content */}
            <div className="p-4 w-full text-center">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.title}
                </h3>
                <p className="text-sm mt-2 text-gray-500 line-clamp-2">
                    {product.description}
                </p>
            </div>
        </div>
    );
};

export default HomeSectionCard;