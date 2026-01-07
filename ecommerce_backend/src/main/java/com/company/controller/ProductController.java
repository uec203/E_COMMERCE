package com.company.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.ProductException;
import com.company.model.Category;
import com.company.model.Product;
import com.company.request.FilterRequest;
import com.company.response.FilterResponse;
import com.company.service.ProductService;

@RestController
@RequestMapping("/public/api/")
public class ProductController {
	
	private ProductService productService;
	

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping("/products/filter")
	public ResponseEntity<FilterResponse> findProductByCategoryhandler(@ModelAttribute FilterRequest request) {
		
		FilterResponse res = productService.getAllProducts(request);
	    
	    return new ResponseEntity<>(res, HttpStatus.ACCEPTED); 
	}
	
	@GetMapping("/category/{category}")
	public ResponseEntity<List<Product>> findProductByCategoryHandler(
	        @PathVariable String category) {
		System.out.println(category);
	    List<Product> products = productService.findProductsByCagetory(category);
	    return new ResponseEntity<>(products, HttpStatus.OK);
	}
	@GetMapping("/allproducts")
	public ResponseEntity<List<Product>> findProductByCategoryhandler() {
		
	    return new ResponseEntity<>(productService.findAllProducts(), HttpStatus.ACCEPTED);
	}
	@GetMapping("/products/id/{productId}")
	public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException {
		Product product = productService.findProductById(productId);
		return new ResponseEntity<>(product,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/products/categories")
	public ResponseEntity<List<Category>> findTopLevelCategory() throws ProductException {
		List<Category> categories = productService.getAllTopLevelcategory();
		return new ResponseEntity<>(categories,HttpStatus.ACCEPTED);
	}
	
}
