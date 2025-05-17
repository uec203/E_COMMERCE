package com.company.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.config.JwtProvider;
import com.company.exception.UserException;
import com.company.model.User;
import com.company.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	
	@Autowired
	public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
		super();
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
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
		userRepository.deleteById(id);
		return;
		
	}
	
	
}
