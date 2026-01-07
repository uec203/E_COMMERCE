package com.company.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.company.exception.OrderException;
import com.company.model.Address;
import com.company.model.Cart;
import com.company.model.CartItem;
import com.company.model.Order;
import com.company.model.OrderItem;
import com.company.model.User;
import com.company.repository.AddressRepository;
import com.company.repository.CartRepository;
import com.company.repository.OrderItemRepository;
import com.company.repository.OrderRepository;
import com.company.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {
	
	
	private CartService cartService;
	private OrderRepository orderRepository;
	private AddressRepository addressRepository;
	private UserRepository userRepository;
	private OrderItemRepository orderItemRepository;

	
	
	public OrderServiceImpl(CartRepository cartRepository, CartService cartService, ProductService productService,
			OrderRepository orderRepository, AddressRepository addressRepository, UserRepository userRepository,
			OrderItemService orderItemService, OrderItemRepository orderItemRepository) {
		super();
		this.cartService = cartService;
		this.orderRepository = orderRepository;
		this.addressRepository = addressRepository;
		this.userRepository = userRepository;
		this.orderItemRepository = orderItemRepository;
	}

	@Override
	public Order createOrder(User user, Address address) {
		
		address.setUser(user);
		address = addressRepository.save(address);
		user.getAddress().add(address);
		userRepository.save(user);
		
		Cart cart = cartService.findUserCart(user.getId());
		List<OrderItem> orderItems = new ArrayList<>();
		
		for(CartItem cartItem : cart.getCartItems()) {
			OrderItem orderItem = new OrderItem();
			
			orderItem.setPrice(cartItem.getPrice());
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setSize(cartItem.getSize());
			orderItem.setUser_id(cartItem.getUserId());
			orderItem.setDiscountedprice(cartItem.getDiscountPrice());
			
			OrderItem createdOrderItem = orderItemRepository.save(orderItem);
			
			orderItems.add(createdOrderItem);
		}
		
		Order createdOrder = new Order();
		createdOrder.setUser(user);
		createdOrder.setOrderItems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountPrice(cart.getTotalDiscountPrice());
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setTotalItems(cart.getTotalItem());
		
		createdOrder.setShippingAddress(address);
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.getPaymentDetails().setStatus("PENDING");
		createdOrder.setCreatedAt(LocalDateTime.now());
		
		Order savedOrder = orderRepository.save(createdOrder);
		
		for(OrderItem orderItem : orderItems) {
			orderItem.setOrder(savedOrder);
			orderItemRepository.save(orderItem);
		}
		return savedOrder;
	}

	@Override
	public Order findOrderById(Long id) throws OrderException {
		Optional<Order> opt =  orderRepository.findById(id);
		if(!opt.isPresent()) throw new OrderException("Order Not Found");
		return opt.get();
	}

	@Override
	public List<Order> userOrderHistory(Long id) {
		List<Order> orders = orderRepository.getUsersOrders(id);
		return orders;
	}

	@Override
	public Order placedOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("PLACED");
		order.getPaymentDetails().setStatus("COMPLETED");
		return order;
	}

	@Override
	public Order confirmedOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("COMFIRMED");
		return orderRepository.save(order);
	}

	@Override
	public Order shippedOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("SHIPPED");
		return orderRepository.save(order);
	}

	@Override
	public Order deliveredOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("DELIVERED");
		return orderRepository.save(order);
	}

	@Override
	public Order cancelOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		order.setOrderStatus("CANCELLED");
		return orderRepository.save(order);
	}

	@Override
	public void deleteOrder(Long id) throws OrderException {
		Order order = findOrderById(id);
		orderRepository.delete(order);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

}
