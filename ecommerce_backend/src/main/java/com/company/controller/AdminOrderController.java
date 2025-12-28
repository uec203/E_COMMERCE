package com.company.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.OrderException;
import com.company.model.Order;
import com.company.response.ApiResponse;
import com.company.service.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminOrderController {

	private OrderService orderService;
	
	
	public AdminOrderController(OrderService orderService) {
		this.orderService = orderService;
	}

	@GetMapping("/allorders")
	public ResponseEntity<List<Order>> getAllOrdersHandler(){
		List<Order> orders = orderService.getAllOrders();
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/confirmed")
	public ResponseEntity<Order> confirmedOrderhandler(@PathVariable Long orderId,@RequestHeader("Authorization") String jwt) throws OrderException{
		
		Order order = orderService.confirmedOrder(orderId);
		
		return new ResponseEntity<>(order,HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/ship")
	public ResponseEntity<Order> shippedOrderhandler(@PathVariable Long orderId,@RequestHeader("Authorization") String jwt) throws OrderException{
		
		Order order = orderService.shippedOrder(orderId);
		
		return new ResponseEntity<>(order,HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/deliver")
	public ResponseEntity<Order> deliveredOrderhandler(@PathVariable Long orderId,@RequestHeader("Authorization") String jwt) throws OrderException{
		
		Order order = orderService.deliveredOrder(orderId);
		
		return new ResponseEntity<>(order,HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Order> cancelledOrderhandler(@PathVariable Long orderId,@RequestHeader("Authorization") String jwt) throws OrderException{
		
		Order order = orderService.cancelOrder(orderId);
		
		return new ResponseEntity<>(order,HttpStatus.OK);
	}
	
	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponse> deleteOrderhandler(@PathVariable Long orderId,@RequestHeader("Authorization") String jwt) throws OrderException{
		
		orderService.deleteOrder(orderId);
		
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Order Deleted Successfully");
		apiResponse.setStatus(true);
		return new ResponseEntity<>(apiResponse,HttpStatus.OK);
	}
}
