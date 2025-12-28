package com.company.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem {


	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="orderId")
	private Order order;
	
	@ManyToOne
	@JoinColumn(name="productId")
	private Product product;
	
	private String size;
	
	private int quantity;
	
	private Integer price;
	private Integer Discountedprice;
	private Long user_id;
	
	private LocalDateTime createdAt;
	

	public OrderItem() {
		super();
	}



	public OrderItem(Long id, Order order, Product product, String size, int quantity, Integer price,
			Integer discountedprice, Long user_id, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.order = order;
		this.product = product;
		this.size = size;
		this.quantity = quantity;
		this.price = price;
		Discountedprice = discountedprice;
		this.user_id = user_id;
		this.createdAt = createdAt;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public Order getOrder() {
		return order;
	}



	public void setOrder(Order order) {
		this.order = order;
	}



	public Product getProduct() {
		return product;
	}



	public void setProduct(Product product) {
		this.product = product;
	}



	public String getSize() {
		return size;
	}



	public void setSize(String size) {
		this.size = size;
	}



	public int getQuantity() {
		return quantity;
	}



	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}



	public Integer getPrice() {
		return price;
	}



	public void setPrice(Integer price) {
		this.price = price;
	}



	public Integer getDiscountedprice() {
		return Discountedprice;
	}



	public void setDiscountedprice(Integer discountedprice) {
		Discountedprice = discountedprice;
	}



	public Long getUser_id() {
		return user_id;
	}



	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}



	public LocalDateTime getCreatedAt() {
		return createdAt;
	}



	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
}
