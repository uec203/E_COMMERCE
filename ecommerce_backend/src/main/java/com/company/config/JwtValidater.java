package com.company.config;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidater extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader(JwtUtils.JWT_HEADER);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            System.out.print("half way");
            return;
        }
        
        try {
            String jwt = authHeader.substring(7);
            
            
            Claims claims = Jwts.parser()
            	        .verifyWith(JwtUtils.key)
            	        .build()
            	        .parseSignedClaims(jwt)
            	        .getPayload();
            
            String email = claims.get("email", String.class);
            
            List<?> authoritiesClaim = claims.get("authorities", List.class);
            
            List<GrantedAuthority> authorities = authoritiesClaim.stream()
            	        .map(role -> {
            	            Map<String, String> map = (Map<String, String>) role;
            	            return new SimpleGrantedAuthority(map.get("authority"));
            	        }).collect(Collectors.toList());
            
            
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(email, null,authorities);
            
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
    

}

