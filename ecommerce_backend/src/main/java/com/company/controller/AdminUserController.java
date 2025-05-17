package com.company.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.exception.UserException;
import com.company.model.User;
import com.company.service.UserService;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

	private UserService userService;
	
	@GetMapping("/all")
	public List<User> getAll(){
		return userService.getAllUser();
	}
	
	@DeleteMapping("/{userId}/delete")
	public void deleteUserById(@PathVariable long userId) throws UserException {
		userService.deleteUserById(userId);
		return;
	}
}
