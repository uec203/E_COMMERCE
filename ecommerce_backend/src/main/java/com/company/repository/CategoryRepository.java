package com.company.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	Category findByName(String name);
	
	@Query("select c from Category c where c.name=:name and c.parentCategory.name = :parentName")
	Category findByNameAndParent(@Param("name") String name,@Param("parentName") String topLevel);
	
	List<Category> findByParentCategory(Category parentCategory);
	
	@Query("select c from Category c where c.level=:level")
	List<Category> findAllCategoryInLevel(@Param("level") int level);
}
