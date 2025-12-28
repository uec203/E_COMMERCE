package com.company.exception;

public class CartItemException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8363161230100852872L;

	public CartItemException() {
		
	}

	public CartItemException(String message) {
		super(message);
	}

	public CartItemException(Throwable cause) {
		super(cause);
	}

	public CartItemException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public CartItemException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}
