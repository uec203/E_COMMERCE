package com.company.model;

import java.time.LocalDate;

import jakarta.persistence.Embeddable;

@Embeddable
public class PaymentInformation {

	private String cardholderName;
	private String cardNumber;
	private String cvv;
	private LocalDate expirationDate;
	
	
	public PaymentInformation() {
		super();
	}



	public PaymentInformation(String cardholderName, String cardNumber, String cvv, LocalDate expirationDate) {
		super();
		this.cardholderName = cardholderName;
		this.cardNumber = cardNumber;
		this.cvv = cvv;
		this.expirationDate = expirationDate;
	}



	public String getCardholderName() {
		return cardholderName;
	}



	public void setCardholderName(String cardholderName) {
		this.cardholderName = cardholderName;
	}



	public String getCardNumber() {
		return cardNumber;
	}



	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}



	public String getCvv() {
		return cvv;
	}



	public void setCvv(String cvv) {
		this.cvv = cvv;
	}



	public LocalDate getExpirationDate() {
		return expirationDate;
	}



	public void setExpirationDate(LocalDate expirationDate) {
		this.expirationDate = expirationDate;
	}
	
	
	
	
}
