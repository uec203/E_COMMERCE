package com.company.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtils {
	
	public static final String SECRET_KEY = "bskaaklnksaxnklsnx kjbwjsbwhdxiwbjsjkwbsjwbslbsqlbsljqsjqsjvjsq";
	public static final String JWT_HEADER = "Authorization";
	private static final long JWT_EXPIRATION = 1000 * 60 * 60;
	static final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	
	
	public static Claims getAllClaimsFromToken(String token) {
	    return Jwts.parser()
	        .verifyWith(key)
	        .build()
	        .parseSignedClaims(token)
	        .getPayload();
	}
	
	public static String getJwtToken(Authentication auth) {
		String jwt = Jwts.builder()
			    .issuedAt(new Date()) 
			    .expiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION)) 
			    .claim("email", auth.getName())
			    .claim("authorities", auth.getAuthorities())
			    .signWith(key) 
			    .compact();
		return jwt;
	}
	
}
