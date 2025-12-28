package com.company.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.exception.ProductException;
import com.company.model.Product;
import com.company.model.Rating;
import com.company.model.User;
import com.company.repository.RatingRepository;
import com.company.request.RatingRequest;

@Service
public class RatingServiceImpl implements RatingService {
	
	private RatingRepository ratingRepository;
	private ProductService productService;

	public RatingServiceImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Autowired
	public RatingServiceImpl(RatingRepository ratingRepository, ProductService productService) {
		super();
		this.ratingRepository = ratingRepository;
		this.productService = productService;
	}



	@Override
	public Rating createRating(RatingRequest req, User user) throws ProductException {
		Product product = productService.findProductById(req.getProductId());
	 	
	 	Rating rating = new Rating();
	 	rating.setUser(user);
	 	rating.setProduct(product);
		rating.setRating(req.getRating());
	 	rating.setCreatedAt(LocalDateTime.now());
	 	
		return ratingRepository.save(rating);
	} 

	@Override
	public List<Rating> getProductsRating(Long productId) {
		return ratingRepository.getAllProductsRating(productId);
	}

}
