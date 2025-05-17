package com.company.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.OrderException;
import com.company.exception.UserException;
import com.company.model.Address;
import com.company.model.Order;
import com.company.model.User;
import com.company.service.OrderService;
import com.company.service.UserService;

@RestController
@RequestMapping("api/orders")
public class OrderController {
	
	private OrderService orderService;
	private UserService userService;
	
	@Autowired
	public OrderController(OrderService orderService, UserService userService) {
		super();
		this.orderService = orderService;
		this.userService = userService;
	}

	@PostMapping("/")
	public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress,@RequestHeader("Authorization") String jwt) throws UserException{
		User user = userService.findUserProfileByJwt(jwt);
		Order order = orderService.createOrder(user, shippingAddress);
		return new ResponseEntity<>(order,HttpStatus.CREATED);
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<Order>> usersOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException{
		User user = userService.findUserProfileByJwt(jwt);
		List<Order> orders = orderService.userOrderHistory(user.getId()); 
		return new ResponseEntity<>(orders,HttpStatus.CREATED);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Order> findOrderById(@PathVariable("id") Long orderId,@RequestHeader("Authorization") String jwt) throws UserException, OrderException{
		User user = userService.findUserProfileByJwt(jwt);
		Order order = orderService.findOrderById(user.getId()); 
		return new ResponseEntity<>(order,HttpStatus.CREATED);
	}
	
}
