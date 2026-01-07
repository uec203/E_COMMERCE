package com.company.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.model.Product;

public interface ProductRepository extends JpaRepository<Product,Long> {

	@Query("SELECT p FROM Product p WHERE (p.category.name = :thirdlevel and p.category.parent.name = :secondlevel and p.category.parent.parent.name = :toplevel) "
			+ "AND (p.discountedPrice BETWEEN :minPrice AND :maxPrice) "
			+ "AND (p.discountPercent >= :minDiscount) ORDER BY "
			+ "  CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, "
			+ "  CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC")
	public Page<Product> filterProduct(@Param("thirdlevel") String thirdlevel, @Param("secondlevel") String secondlevel,
			@Param("toplevel") String toplevel, @Param("minPrice") Integer minPrice,
			@Param("maxPrice") Integer maxPrice, @Param("minDiscount") Integer minDiscount, @Param("sort") String sort,Pageable pageable);

	
    @Query("SELECT p FROM Product p WHERE p.category.id IN :categoryIds")
    List<Product> findByCategoryIds(@Param("categoryIds") List<Long> categoryIds);

}
