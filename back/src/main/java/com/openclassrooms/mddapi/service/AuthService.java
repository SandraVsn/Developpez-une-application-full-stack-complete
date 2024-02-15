package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

import lombok.Data;

@Data
@Service
public class AuthService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
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
	
	public User login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user; 
        } else {
            return null;
        }
	
	}
	
}

