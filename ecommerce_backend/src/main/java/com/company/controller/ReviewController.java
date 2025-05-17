package com.company.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.ProductException;
import com.company.exception.UserException;
import com.company.model.Review;
import com.company.model.User;
import com.company.request.ReviewRequest;
import com.company.service.ReviewService;
import com.company.service.UserService;

@RestController
@RequestMapping("/api/ratings")
public class ReviewController {

	private UserService userService;
	private ReviewService reviewService;
	
	@Autowired
	public ReviewController(UserService userService, ReviewService reviewService) {
		super();
		this.userService = userService;
		this.reviewService = reviewService;
	}

	@PostMapping("/create")
	public ResponseEntity<Review> createRating(@RequestBody ReviewRequest req,@RequestHeader("Authorization") String jwt) throws ProductException, UserException{
		
		User user = userService.findUserProfileByJwt(jwt);
		
		Review review = reviewService.createReview(req, user);
		
		return new ResponseEntity<>(review,HttpStatus.CREATED);
	}
	
	@PostMapping("/product/{productId}")
	public ResponseEntity<List<Review>> getProductReview(@PathVariable Long productId,@RequestHeader("Authorization") String jwt) throws ProductException, UserException{
		
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Review> review = reviewService.getProductsReview(productId);
		
		return new ResponseEntity<>(review,HttpStatus.ACCEPTED);
	}
}
