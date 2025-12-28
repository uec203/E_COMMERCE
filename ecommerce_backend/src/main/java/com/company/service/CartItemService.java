package com.company.service;

import com.company.exception.CartItemException;
import com.company.exception.UserException;
import com.company.model.Cart;
import com.company.model.CartItem;
import com.company.model.Product;

public interface CartItemService {

	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId,Long id,CartItem cartItem) throws CartItemException,UserException;
	
	public CartItem isCartItemExist(Cart cart,Product product,String size,Long userId);
	
	public void removeCartItem(Long userId,Long cartItemId) throws CartItemException,UserException;
	
	public CartItem findCartItemById(Long cartItemId) throws CartItemException;
	
	
}
