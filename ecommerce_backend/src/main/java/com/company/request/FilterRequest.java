package com.company.request;

import java.util.List;

public class FilterRequest {

    private String categoryOne;
    private String categoryTwo;
    private String categoryThree;

    private String colors;
    private String sizes;

    private Integer minPrice;
    private Integer maxPrice;
    private Integer maxDiscount;

    private String sort;

    private Integer pageNumber;
    private Integer pageSize;

    private Boolean stock;

	public String getCategoryOne() {
		return categoryOne;
	}

	public void setCategoryOne(String categoryOne) {
		this.categoryOne = categoryOne;
	}

	public String getCategoryTwo() {
		return categoryTwo;
	}

	public void setCategoryTwo(String categoryTwo) {
		this.categoryTwo = categoryTwo;
	}

	public String getCategoryThree() {
		return categoryThree;
	}

	public void setCategoryThree(String categoryThree) {
		this.categoryThree = categoryThree;
	}

	public String getColors() {
		return colors;
	}

	public void setColors(String colors) {
		this.colors = colors;
	}

	public String getSizes() {
		return sizes;
	}

	public void setSizes(String sizes) {
		this.sizes = sizes;
	}

	public Integer getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(Integer minPrice) {
		this.minPrice = minPrice;
	}

	public Integer getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(Integer maxPrice) {
		this.maxPrice = maxPrice;
	}

	public Integer getMaxDiscount() {
		return maxDiscount;
	}

	public void setMaxDiscount(Integer maxDiscount) {
		this.maxDiscount = maxDiscount;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public Integer getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(Integer pageNumber) {
		this.pageNumber = pageNumber;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Boolean getStock() {
		return stock;
	}

	public void setStock(Boolean stock) {
		this.stock = stock;
	}
    
}
