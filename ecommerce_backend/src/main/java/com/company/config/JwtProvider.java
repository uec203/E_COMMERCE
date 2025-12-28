package com.company.config;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;

@Service
public class JwtProvider {
	
	public String tokenGenerator(Authentication auth) {	
		return JwtUtils.getJwtToken(auth);
	}
	
	public String getEmailFromToken(String jwt) {
		jwt = jwt.substring(7);
		
		Claims claims = JwtUtils.getAllClaimsFromToken(jwt);
		String email = String.valueOf(claims.get("email"));
		
		return email;
	}
}

