package com.company.service;

import com.company.exception.UserException;
import com.company.request.LoginRequest;
import com.company.request.RegisterRequest;
import com.company.response.AuthResponse;

public interface AuthService {
	AuthResponse getAuthResponse(RegisterRequest user) throws UserException;
	AuthResponse getLoginAuthResponse(LoginRequest loginRequest);
}
