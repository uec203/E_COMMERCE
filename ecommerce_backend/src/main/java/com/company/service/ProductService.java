package com.company.service;

import java.util.List;

import com.company.exception.ProductException;
import com.company.model.Category;
import com.company.model.Product;
import com.company.request.CreateProductRequest;
import com.company.request.FilterRequest;
import com.company.response.FilterResponse;

public interface ProductService {

	Product createProduct(CreateProductRequest req);
	
	String deleteProduct(Long id) throws ProductException;
	
	Product updateProduct(Long id,Product req)  throws ProductException;
	
	Product findProductById(Long id)  throws ProductException;
	
	List<Product> findProductsByCagetory(String category);
	
	FilterResponse getAllProducts(FilterRequest request);
	
	List<Product> findAllProducts();
	
	List<Category> getAllTopLevelcategory();
	
}
