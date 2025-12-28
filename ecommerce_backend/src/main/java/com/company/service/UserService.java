package com.company.service;

import java.util.List;

import com.company.exception.UserException;
import com.company.model.User;

public interface UserService {
	
	public User findUserById(Long id) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public List<User> getAllUser();
	
	public void deleteUserById(Long userId) throws UserException;
}
