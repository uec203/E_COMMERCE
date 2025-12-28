package com.company.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.ProductException;
import com.company.model.Category;
import com.company.model.Product;
import com.company.service.ProductService;

@RestController
@RequestMapping("/public/api/")
public class ProductController {
	
	private ProductService productService;
	

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping("/products")
	public ResponseEntity<Page<Product>> findProductByCategoryhandler(
	        @RequestParam(defaultValue = "defaultCategory") String category,
	        @RequestParam(defaultValue = "[]") List<String> colors,  // Default empty list
	        @RequestParam(defaultValue = "[]") List<String> sizes,  // Default empty list
	        @RequestParam(defaultValue = "0") Integer minPrice,
	        @RequestParam(defaultValue = "1000000") Integer maxPrice,
	        @RequestParam(defaultValue = "0") Integer minDiscount,
	        @RequestParam(defaultValue = "price") String sort,  // Default sort by price
	        @RequestParam(defaultValue = "inStock") String stock,  // Default to in stock
	        @RequestParam(defaultValue = "1") Integer pageNumber,
	        @RequestParam(defaultValue = "10") Integer pageSize) {

	    Page<Product> res = productService.getAllProducts(
	            category, colors, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
	    System.out.println(res.getNumberOfElements());
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
