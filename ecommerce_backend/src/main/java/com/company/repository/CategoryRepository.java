package com.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	public Category findByName(String name);
	
	
	@Query("select c from Category c where c.name=:name and c.parentCategory.name = :parentName")
	public Category findByNameAndParent(@Param("name") String name,@Param("parentName") String topLevel);
}
