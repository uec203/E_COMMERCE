package com.company.request;

import java.util.HashSet;
import java.util.Set;

import com.company.model.Size;

public class CreateProductRequest {

	private String title;
	
	private String description;
	
	private int price;
	
	private int discountPercent;
	
	private int quantity;
	
	private String brand;
	
	private String color;
	
	private Set<Size>  sizes = new HashSet<>();
	
	private String imageUrl;
	
	private String FirstLevelCategory;
	private String SecondLevelCategory;
	private String ThirdLevelCategory;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getDiscountPercent() {
		return discountPercent;
	}
	public void setDiscountPercent(int discountPercent) {
		this.discountPercent = discountPercent;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Set<Size> getSizes() {
		return sizes;
	}
	public void setSizes(Set<Size> sizes) {
		this.sizes = sizes;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getFirstLevelCategory() {
		return FirstLevelCategory;
	}
	public void setFirstLevelCategory(String firstLevelCategory) {
		FirstLevelCategory = firstLevelCategory;
	}
	public String getSecondLevelCategory() {
		return SecondLevelCategory;
	}
	public void setSecondLevelCategory(String secondLevelCategory) {
		SecondLevelCategory = secondLevelCategory;
	}
	public String getThirdLevelCategory() {
		return ThirdLevelCategory;
	}
	public void setThirdLevelCategory(String thirdLevelCategory) {
		ThirdLevelCategory = thirdLevelCategory;
	}
	
	
}
