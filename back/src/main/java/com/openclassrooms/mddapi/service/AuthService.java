package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

import lombok.Data;

@Data
@Service
public class AuthService {

	private UserRepository userRepository;
	
	@Autowired
	public AuthService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
		
	public User getMe(String email) {
		return userRepository.findByEmail(email);
	}
	
	public User register(User user) {
		User userInDB = userRepository.findByEmail(user.getEmail());
		if(userInDB != null) {
			throw new IllegalArgumentException("User already exists");
		}
		return userRepository.save(user);
	}
	
}

