package com.company.service;

import java.util.List;

import com.company.exception.OrderException;
import com.company.model.Address;
import com.company.model.Order;
import com.company.model.User;

public interface OrderService {

	public Order createOrder(User user,Address address);
	
	public Order findOrderById(Long id) throws OrderException;
	
	public List<Order> userOrderHistory(Long id);
	
	public Order placedOrder(Long id) throws OrderException;
	
	public Order confirmedOrder(Long id) throws OrderException;
	
	public Order shippedOrder(Long id) throws OrderException;
	
	public Order deliveredOrder(Long id) throws OrderException;
	
	public Order cancelOrder(Long id) throws OrderException;
	
	public void deleteOrder(Long id) throws OrderException;
	
	public List<Order> getAllOrders();
	
}
