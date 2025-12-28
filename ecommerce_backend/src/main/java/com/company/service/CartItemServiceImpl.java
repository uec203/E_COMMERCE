package com.company.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.exception.CartItemException;
import com.company.exception.UserException;
import com.company.model.Cart;
import com.company.model.CartItem;
import com.company.model.Product;
import com.company.model.User;
import com.company.repository.CartItemRepository;

@Service
public class CartItemServiceImpl implements CartItemService {
	
	private CartItemRepository cartItemRepository;
	private UserService userService;
	
	public CartItemServiceImpl() {
		super();
	}

	@Autowired
	public CartItemServiceImpl(CartItemRepository cartItemRepository, UserService userService) {
		super();
		this.cartItemRepository = cartItemRepository;
		this.userService = userService;
	}

	@Override
	public CartItem createCartItem(CartItem cartItem) {
		cartItem.setQuantity(1);
		cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
		cartItem.setDiscountPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());
		
		CartItem createdCartItem = cartItemRepository.save(cartItem);
		return createdCartItem;
	}

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
		CartItem item = findCartItemById(id);
		User user = userService.findUserById(item.getUserId());
		
		if(user.getId().equals(userId)) {
			item.setQuantity(cartItem.getQuantity());
			item.setPrice(item.getProduct().getPrice()*item.getQuantity());
			item.setDiscountPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());
		}
		
		return cartItemRepository.save(item);
	}

	@Override
	public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
		
		return cartItemRepository.isCartItemExist(cart, product, size, userId);
	}

	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
		CartItem cartItem = findCartItemById(cartItemId);
		User user = userService.findUserById(cartItem.getUserId());
		User reqUser = userService.findUserById(userId);
		if(user.getId().equals(reqUser.getId())) {
			cartItemRepository.deleteById(cartItemId);
		}
		else {
			throw new UserException("you can't remove another user item");
		}
	}

	@Override
	public CartItem findCartItemById(Long cartItemId) throws CartItemException {
		Optional<CartItem> opt =  cartItemRepository.findById(cartItemId);
		if(!opt.isPresent()) throw new CartItemException("Product Not Found");
		return opt.get();
	}

}
