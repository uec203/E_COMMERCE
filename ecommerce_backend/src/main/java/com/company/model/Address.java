package com.company.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Address {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long value;
	
	private String firstName;
	private String LastName;
	
	private String address;
	private String city;
	private String state;
	private String zipCode;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="userId")
	private User user;
	
	private String mobile;

	public Address() {
		super();
	}
	

	public Address(Long value, String firstName, String lastName, String streetAddress, String city, String state,
			User user, String mobile) {
		super();
		this.value = value;
		this.firstName = firstName;
		this.LastName = lastName;
		this.address = streetAddress;
		this.city = city;
		this.state = state;
		this.user = user;
		this.mobile = mobile;
	}



	public Long getValue() {
		return value;
	}

	public void setValue(Long value) {
		this.value = value;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return LastName;
	}

	public void setLastName(String lastName) {
		LastName = lastName;
	}

	public String getStreetAddress() {
		return address;
	}

	public void setStreetAddress(String streetAddress) {
		this.address = streetAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public String getZipCode() {
		return zipCode;
	}


	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}


	public void setState(String state) {
		this.state = state;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	
	
}
