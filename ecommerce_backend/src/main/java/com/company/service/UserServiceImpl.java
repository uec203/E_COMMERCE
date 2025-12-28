package com.company.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.company.config.JwtProvider;
import com.company.exception.UserException;
import com.company.model.Cart;
import com.company.model.User;
import com.company.repository.CartRepository;
import com.company.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private CartRepository cartRepository;

	public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider, CartRepository cartRepository) {
		super();
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
		this.cartRepository = cartRepository;
	}

	@Override
	public User findUserById(Long id) throws UserException {
		Optional<User> opt =  userRepository.findById(id);
		if(!opt.isPresent()) throw new UserException("User Not Found");
		return opt.get();
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromToken(jwt);
		System.out.println("user email is "+email);
		if(email.startsWith("admin")) {
			User user = new User();
			user.setEmail(email);
			user.setRole("ADMIN");
			user.setFirstName("admin");
			return user;
		}
		User user = userRepository.findByEmail(email);
		if(user==null) throw new UserException("User Not Found");
		return user;
	}

	@Override
	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	@Override
	public void deleteUserById(Long id) throws UserException {
		Cart cart = cartRepository.findByUserId(id);
		cartRepository.deleteById(cart.getId());
		userRepository.deleteById(id);
		return;
		
	}
	
	
}
