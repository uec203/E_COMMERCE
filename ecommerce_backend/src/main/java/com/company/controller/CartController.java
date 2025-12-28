package com.company.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.ProductException;
import com.company.exception.UserException;
import com.company.model.Cart;
import com.company.model.User;
import com.company.request.AddItemRequest;
import com.company.response.ApiResponse;
import com.company.service.CartService;
import com.company.service.UserService;

@RestController
@RequestMapping("/api/cart")
@PreAuthorize("hasAuthority('ROLE_USER')")
public class CartController {
	
	private CartService cartService;
	private UserService userService;

	public CartController(CartService cartService, UserService userService) {
		super();
		this.cartService = cartService;
		this.userService = userService;
	}

	@GetMapping("/get")
	public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException{
		User user = userService.findUserProfileByJwt(jwt);
		Cart cart = cartService.findUserCart(user.getId());

		return new ResponseEntity<>(cart,HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req,@RequestHeader("Authorization") String jwt) throws UserException, ProductException{
		User user = userService.findUserProfileByJwt(jwt);
		System.out.println(user.getEmail()+" "+user.getId());
		cartService.addCartItems(user.getId(), req);
		
		
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Item Added Successfully");
		apiResponse.setStatus(true);
		return new ResponseEntity<>(apiResponse,HttpStatus.OK);
	}
	
}
