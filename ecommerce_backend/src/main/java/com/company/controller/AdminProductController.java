package com.company.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.ProductException;
import com.company.model.Product;
import com.company.model.Size;
import com.company.request.CreateProductRequest;
import com.company.response.ApiResponse;
import com.company.service.ProductService;

@RestController
@RequestMapping("/api/admin/products")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminProductController {

	private ProductService productService;

	
	public AdminProductController(ProductService productService) {
		this.productService = productService;
	}


	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> deleteOrderhandler(@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws ProductException {

		productService.deleteProduct(productId);

		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Product Deleted Successfully");
		apiResponse.setStatus(true);
		return new ResponseEntity<>(apiResponse, HttpStatus.OK);

	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> getAllOrdersHandler(){
		List<Product> products = productService.findAllProducts();
		
		return new ResponseEntity<>(products,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{productId}/confirmed")
	public ResponseEntity<Product> updateProduct(@RequestBody Product req,@PathVariable Long productId) throws ProductException{
		
		Product product = productService.updateProduct(productId, req);
		
		return new ResponseEntity<>(product,HttpStatus.OK);
	}
	
	@PostMapping("/creates")
	public ResponseEntity<ApiResponse> createMutipleProducts(@RequestBody CreateProductRequest req ) {
		System.out.println("sizes: "+req.getSizes().size());
		for(Size s: req.getSizes()) {
			System.out.println(s.getQuantity()+" "+s.getName());
		}
		productService.createProduct(req);
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Product Created Successfully");
		apiResponse.setStatus(true);
		return new ResponseEntity<>(apiResponse,HttpStatus.CREATED);
	}
}
