package com.company.service;

import java.util.List;

import com.company.exception.ProductException;
import com.company.model.Review;
import com.company.model.User;
import com.company.request.ReviewRequest;

public interface ReviewService {

    public Review createReview(ReviewRequest req,User user) throws ProductException;
	
	public List<Review> getProductsReview(Long productId);
}
