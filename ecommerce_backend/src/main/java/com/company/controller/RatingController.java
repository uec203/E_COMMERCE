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
import com.company.model.Rating;
import com.company.model.User;
import com.company.request.RatingRequest;
import com.company.service.RatingService;
import com.company.service.UserService;

@RestController
@RequestMapping("/api/reviews")
public class RatingController {

	private UserService userService;
	private RatingService ratingService;
	
	@Autowired
	public RatingController(UserService userService, RatingService ratingService) {
		super();
		this.userService = userService;
		this.ratingService = ratingService;
	}

	@PostMapping("/create")
	public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req,@RequestHeader("Authorization") String jwt) throws ProductException, UserException{
		
		User user = userService.findUserProfileByJwt(jwt);
		
		Rating rating = ratingService.createRating(req, user);
		
		return new ResponseEntity<>(rating,HttpStatus.CREATED);
	}
	
	@PostMapping("/product/{productId}")
	public ResponseEntity<List<Rating>> getProductRating(@PathVariable Long productId,@RequestHeader("Authorization") String jwt) throws ProductException, UserException{
		
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Rating> rating = ratingService.getProductsRating(productId);
		
		return new ResponseEntity<>(rating,HttpStatus.ACCEPTED);
	}
}
