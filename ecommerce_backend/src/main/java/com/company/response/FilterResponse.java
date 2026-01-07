package com.company.response;

import org.springframework.data.domain.Page;

import com.company.model.Product;

public class FilterResponse {
	private Page<Product> products;
	private int totalPages;
	
	public FilterResponse() {
		super();
	}
	public FilterResponse(Page<Product> products, int totalPages) {
		super();
		this.products = products;
		this.totalPages = totalPages;
	}
	public Page<Product> getProducts() {
		return products;
	}
	public void setProducts(Page<Product> products) {
		this.products = products;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	
	
}
