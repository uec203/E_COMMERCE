package com.company.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.model.OrderItem;
import com.company.repository.OrderItemRepository;

@Service
public class OrderItemServiceImpl implements OrderItemService {

	
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	public OrderItemServiceImpl(OrderItemRepository orderItemRepository) {
		super();
		this.orderItemRepository = orderItemRepository;
	}


	public OrderItemRepository getOrderItemRepository() {
		return orderItemRepository;
	}


	public void setOrderItemRepository(OrderItemRepository orderItemRepository) {
		this.orderItemRepository = orderItemRepository;
	}


	@Override
	public OrderItem createOrderItem(OrderItem orderItem) {
		// TODO Auto-generated method stub
		return orderItemRepository.save(orderItem);
	}

}
