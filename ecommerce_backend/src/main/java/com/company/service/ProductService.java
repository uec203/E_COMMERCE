package com.company.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.company.exception.ProductException;
import com.company.model.Category;
import com.company.model.Product;
import com.company.request.CreateProductRequest;

public interface ProductService {

	Product createProduct(CreateProductRequest req);
	
	String deleteProduct(Long id) throws ProductException;
	
	Product updateProduct(Long id,Product req)  throws ProductException;
	
	Product findProductById(Long id)  throws ProductException;
	
	List<Product> findProductsByCagetory(String category);
	
	Page<Product> getAllProducts(String cagetory,List<String> colors,List<String> sizes,Integer minPrice,Integer maxPrice
			,Integer minDiscount,String sort,String stock,Integer pageNumber,Integer pageSize);
	
	List<Product> findAllProducts();
	
	List<Category> getAllTopLevelcategory();
	
}
