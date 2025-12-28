package com.company.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.CartItemException;
import com.company.exception.ProductException;
import com.company.exception.UserException;
import com.company.model.CartItem;
import com.company.model.User;
import com.company.request.AddItemRequest;
import com.company.request.UpdateProductRequest;
import com.company.response.ApiResponse;
import com.company.service.CartItemService;
import com.company.service.UserService;

@RestController
@RequestMapping("/api/cartitem")
@PreAuthorize("hasAuthority('ROLE_USER')")
public class CartItemController {

	private UserService userService;
	private CartItemService cartItemService;
	public CartItemController(UserService userService, CartItemService cartItemService) {
		super();
		this.userService = userService;
		this.cartItemService = cartItemService;
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ApiResponse> addItemToCart(@PathVariable Long id,@RequestHeader("Authorization") String jwt) throws UserException, ProductException, CartItemException{
		User user = userService.findUserProfileByJwt(jwt);
		
		cartItemService.removeCartItem(user.getId(), id);
		
		
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Item Removed Successfully");
		apiResponse.setStatus(true);
		return new ResponseEntity<>(apiResponse,HttpStatus.OK);
	}
	
    @PutMapping("/update/{id}")
    public ResponseEntity<CartItem> updateCartItem( 
            @PathVariable Long id, 
            @RequestHeader("Authorization") String jwt,
            @RequestBody CartItem cartItem) throws UserException, CartItemException {
    	User user = userService.findUserProfileByJwt(jwt);

        try {
            // Call the service method to update the CartItem
            CartItem updatedItem = cartItemService.updateCartItem(user.getId(), id, cartItem);
            
            // Return a successful response with the updated CartItem
            return ResponseEntity.ok(updatedItem);
        } catch (UserException e) {
            // Handle UserException (maybe the user does not exist)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }
	
}
