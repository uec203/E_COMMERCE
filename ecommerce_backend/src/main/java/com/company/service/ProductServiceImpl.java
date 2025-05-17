package com.company.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.company.exception.ProductException;
import com.company.model.Category;
import com.company.model.Product;
import com.company.repository.CategoryRepository;
import com.company.repository.ProductRepository;
import com.company.request.CreateProductRequest;

@Service
public class ProductServiceImpl implements ProductService {

	private ProductRepository productRepository;
	private CategoryRepository categoryRepository;
	private UserService userService;
	
	public ProductServiceImpl() {
		super();
	}

	@Autowired
	public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository,
			UserService userService) {
		super();
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
		this.userService = userService;
	}

	@Override
	public Product createProduct(CreateProductRequest req) {
		Category topLevel = categoryRepository.findByName(req.getFirstLevelCategory());
		if(topLevel==null) {
			Category topLevelCategory =new Category();
			topLevelCategory.setName(req.getFirstLevelCategory());
			topLevelCategory.setLevel(1);
			
			topLevel = categoryRepository.save(topLevelCategory);
		}
		
		Category secondLevel = categoryRepository.findByNameAndParent(req.getSecondLevelCategory(),topLevel.getName());
		if(secondLevel==null) {
			Category topLevelCategory =new Category();
			topLevelCategory.setName(req.getSecondLevelCategory());
			topLevelCategory.setParentcategory(topLevel);
			topLevelCategory.setLevel(2);
			
			secondLevel = categoryRepository.save(topLevelCategory);
		}
		
		Category thirdLevel = categoryRepository.findByNameAndParent(req.getThirdLevelCategory(),secondLevel.getName());
		if(thirdLevel==null) {
			Category topLevelCategory =new Category();
			topLevelCategory.setName(req.getThirdLevelCategory());
			topLevelCategory.setParentcategory(secondLevel);
			topLevelCategory.setLevel(3);
			
			thirdLevel = categoryRepository.save(topLevelCategory);
		}
		
		Product product = new Product();
		product.setTitle(req.getTitle());
		product.setColor(req.getColor());
		product.setDescription(req.getDescription());
		product.setDiscountedPrice(req.getDiscountedPrice());
		product.setDiscountPercent(req.getDiscountPercent());
		product.setImageUrl(req.getImageUrl());
		product.setBrand(req.getBrand());
		product.setPrice(req.getPrice());
		product.setSizes(req.getSizes());
		product.setQuantity(req.getQuantity());
		product.setCategory(thirdLevel);
		product.setCreatedAt(LocalDateTime.now());
		
		product = productRepository.save(product);
		return product;
	}

	@Override
	public String deleteProduct(Long id) throws ProductException {
		Product product = findProductById(id);
		product.getSizes().clear();
		productRepository.delete(product);
		
		return "Product Deleted";
	}

	@Override
	public Product updateProduct(Long id, Product req) throws ProductException {
		Product product = findProductById(id);
		if(req.getQuantity()!=0) {
			product.setQuantity(req.getQuantity());
		}
		return productRepository.save(product);
	}

	@Override
	public Product findProductById(Long id) throws ProductException {
		Optional<Product> opt =  productRepository.findById(id);
		if(!opt.isPresent()) throw new ProductException("Product Not Found");
		return opt.get();
	}

	@Override
	public List<Product> findProductsByCagetory(String category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Product> getAllProducts(String cagetory, List<String> colors, List<String> sizes, Integer minPrice,
			Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
		
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		 
		List<Product> products = productRepository.filterProduct(cagetory, minPrice, maxPrice, minDiscount, sort);
		
		if(!colors.isEmpty()) {
			products = products.stream().filter(p->colors.stream().anyMatch(c->c.equalsIgnoreCase(p.getColor()))).collect(Collectors.toList());
		}
		
		if(stock!=null) {
			if(stock.equals("in_stock")) {
				products=products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
			}
			else if(stock.equals("out_of_stock")) {
				products=products.stream().filter(p->p.getQuantity()==0).collect(Collectors.toList());
			}
		}
		
		int startIndex = (int) pageable.getOffset();
		int endIndex = Math.min(startIndex+pageable.getPageSize(), products.size());
		
		List<Product> pageContent = products.subList(startIndex, endIndex);
		
		Page<Product> filteredProducts = new PageImpl<>(pageContent,pageable,products.size());
		
		return filteredProducts;
	}

	@Override
	public List<Product> findAllProducts() {
		// TODO Auto-generated method stub
		return productRepository.findAll();
	}

}
