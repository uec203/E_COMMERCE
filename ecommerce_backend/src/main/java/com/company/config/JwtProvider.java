package com.company.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {
	
	
	public JwtProvider() {
		super();
	}

	
	public JwtProvider(SecretKey key) {
		super();
		this.key = key;
	}



	SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
	
	public String tokenGenerator(Authentication auth) {
		String jwt = Jwts.builder().setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+846000L)).claim("email",auth.getName()).
				claim("authorities","ROLE_USER").signWith(key).compact();
		return jwt;
	}
	
	public String getEmailFromToken(String jwt) {
		jwt = jwt.substring(7);
		
		Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		String email = String.valueOf(claims.get("email"));
		
		return email;
	}
}

