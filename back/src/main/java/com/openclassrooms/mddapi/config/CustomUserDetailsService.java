package com.openclassrooms.mddapi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
private UserRepository userRepository;

	
	@Autowired
	public CustomUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		com.openclassrooms.mddapi.model.User user = userRepository.findByEmail(email);
		
		return new User(user.getEmail(), user.getPassword(), null);
	}

}
