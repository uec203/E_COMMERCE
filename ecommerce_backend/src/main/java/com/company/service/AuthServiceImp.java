package com.company.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.company.config.JwtProvider;
import com.company.exception.UserException;
import com.company.model.User;
import com.company.repository.UserRepository;
import com.company.request.LoginRequest;
import com.company.request.RegisterRequest;
import com.company.response.AuthResponse;

@Service
public class AuthServiceImp implements AuthService{
	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	private CustomerUserServiceImplementation customerUserService;
	private CartService cartService;
	
	public AuthServiceImp(UserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder,
			CustomerUserServiceImplementation customerUserService, CartService cartService) {
		super();
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
		this.customerUserService = customerUserService;
		this.cartService = cartService;
	}



	public AuthResponse getAuthResponse(RegisterRequest user) throws UserException {

		String email = user.getEmail();
		String password = user.getPassword();
		String firstString = user.getFirstName();
		String lastNString = user.getLastName();

		User isEmailExist = userRepository.findByEmail(email);

		if (isEmailExist != null)
			throw new UserException("Email is Already  Used by Another Account");

		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setFirstName(firstString);
		createdUser.setLastName(lastNString);
		createdUser.setRole("USER");

		User savedUser = userRepository.save(createdUser);
		cartService.createCart(savedUser);

		Authentication authentication = authenticate(savedUser.getEmail(), savedUser.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.tokenGenerator(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Signup success");
		
		return authResponse;
	}
	
	
	
	private Authentication authenticate(String name, String password) {
		UserDetails userDetails = customerUserService.loadUserByUsername(name);

		if (userDetails == null) {
			throw new BadCredentialsException("Invalid Username");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}



	@Override
	public AuthResponse getLoginAuthResponse(LoginRequest loginRequest) {
		String username = loginRequest.getName();
		String password = loginRequest.getPassword();

		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.tokenGenerator(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Signin success");
		return authResponse;
	}
	
}
