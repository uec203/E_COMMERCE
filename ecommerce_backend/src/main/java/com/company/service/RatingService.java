package com.company.service;

import java.util.List;

import com.company.exception.ProductException;
import com.company.model.Rating;
import com.company.model.User;
import com.company.request.RatingRequest;

public interface RatingService {
	
	public Rating createRating(RatingRequest req,User user) throws ProductException;
	
	public List<Rating> getProductsRating(Long productId);

	
}
