package com.company.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import com.company.request.FilterRequest;
import com.company.response.FilterResponse;

@Service
public class ProductServiceImpl implements ProductService {

	private ProductRepository productRepository;
	private CategoryRepository categoryRepository;
	public ProductServiceImpl() {
		super();
	}

	@Autowired
	public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository,
			UserService userService) {
		super();
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
	}

	@Override
	public Product createProduct(CreateProductRequest req) {
		Category topLevel = categoryRepository.findByName(req.getFirstLevelCategory());
		if(topLevel==null) {
			Category topLevelCategory =new Category();
			topLevelCategory.setName(req.getFirstLevelCategory());
			topLevelCategory.setLevel(3);
			
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
			topLevelCategory.setLevel(1);
			
			thirdLevel = categoryRepository.save(topLevelCategory);
		}
		
		Product product = new Product();
		product.setTitle(req.getTitle());
		product.setColor(req.getColor());
		product.setDescription(req.getDescription());
		product.setDiscountPercent(req.getDiscountPercent());
		product.setDiscountedPrice((int)((req.getPrice()/100.0)*(100-req.getDiscountPercent())));
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
	public List<Product> findProductsByCagetory(String categoryName) {
	    Category category = categoryRepository.findByName(categoryName);
	    if(category == null) {
	        return new ArrayList<>();
	    }
	    List<Long> categoryIds = getAllCategoryIds(category);
	    return productRepository.findByCategoryIds(categoryIds);
	}


	private List<Long> getAllCategoryIds(Category category) {
	    List<Long> ids = new ArrayList<>();
	    ids.add(category.getId());
	    List<Category> subCategories = categoryRepository.findByParentCategory(category);
	    for(Category sub : subCategories) {
	        ids.addAll(getAllCategoryIds(sub));
	    }
	    return ids;
	}


	@Override
	public FilterResponse getAllProducts(FilterRequest req) {
		Pageable pageable = PageRequest.of(req.getPageNumber(), req.getPageSize());

		Page<Product> page = productRepository.filterProduct(req.getCategoryThree(),req.getCategoryTwo(),
				req.getCategoryThree(),req.getMinPrice(),req.getMaxPrice(),req.getMaxDiscount(),req.getSort(),pageable);
		
		return new FilterResponse(page,page.getTotalPages());
	}
	

	@Override
	public List<Product> findAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public List<Category> getAllTopLevelcategory() {
		return categoryRepository.findAllCategoryInLevel(1);
	}
	
	

}
