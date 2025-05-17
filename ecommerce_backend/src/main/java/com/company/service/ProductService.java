package com.company.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.company.exception.ProductException;
import com.company.model.Product;
import com.company.request.CreateProductRequest;

public interface ProductService {

	public Product createProduct(CreateProductRequest req);
	
	public String deleteProduct(Long id) throws ProductException;
	
	public Product updateProduct(Long id,Product req)  throws ProductException;
	
	public Product findProductById(Long id)  throws ProductException;
	
	public List<Product> findProductsByCagetory(String category);
	
	public Page<Product> getAllProducts(String cagetory,List<String> colors,List<String> sizes,Integer minPrice,Integer maxPrice
			,Integer minDiscount,String sort,String stock,Integer pageNumber,Integer pageSize);
	
	public List<Product> findAllProducts();
}
