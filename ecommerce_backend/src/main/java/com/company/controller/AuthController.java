package com.company.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.UserException;
import com.company.model.User;
import com.company.request.LoginRequest;
import com.company.request.RegisterRequest;
import com.company.response.AuthResponse;
import com.company.service.AuthService;

@RestController
@RequestMapping("/public/auth")
public class AuthController {
	
	private AuthService authService; 

	public AuthController(AuthService authService) {
		super();
		this.authService = authService;
	}

	@PostMapping("signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody RegisterRequest user) throws UserException {
		AuthResponse authResponse = authService.getAuthResponse(user);

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
	}

	@PostMapping("signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
		AuthResponse authResponse = authService.getLoginAuthResponse(loginRequest);
		System.out.print("sksmk");
		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.ACCEPTED);
	}


}
