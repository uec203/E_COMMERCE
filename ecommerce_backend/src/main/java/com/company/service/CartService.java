package com.company.service;

import com.company.exception.ProductException;
import com.company.model.Cart;
import com.company.model.User;
import com.company.request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public String addCartItems(Long userId,AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long id);


}
