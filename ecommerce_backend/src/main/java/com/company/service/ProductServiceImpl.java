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
	public Page<Product> getAllProducts(String cagetory, List<String> colors, List<String> sizes, Integer minPrice,
			Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
		
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		 
		List<Product> products = productRepository.filterProduct(cagetory, minPrice, maxPrice, minDiscount, sort);
		System.out.print(products.size());
		
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
		return productRepository.findAll();
	}

	@Override
	public List<Category> getAllTopLevelcategory() {
		return categoryRepository.findAllCategoryInLevel(1);
	}
	
	

}
