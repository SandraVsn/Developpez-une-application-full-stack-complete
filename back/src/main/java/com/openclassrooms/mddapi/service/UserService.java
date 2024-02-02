package com.openclassrooms.mddapi.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.BadRequestException;
import com.openclassrooms.mddapi.exception.NotFoundException;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

import lombok.Data;

@Data
@Service
public class UserService {
    private UserRepository userRepository;
    private TopicRepository topicRepository;

    @Autowired
    public UserService(UserRepository userRepository, TopicRepository topicRepository) {
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    public Optional<User> getUser(final Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    
    public User subscribe(User user, Long topicId) {
        boolean alreadySubscribed = user.getTopics().stream().anyMatch(o -> o.getId().equals(topicId));
        if(alreadySubscribed) {
            throw new BadRequestException();
        }
        
    	Topic topic = this.topicRepository.findById(topicId).orElse(null);
    	if(topic == null) {
            throw new NotFoundException();
    	}
    	
    	user.getTopics().add(topic);

        return userRepository.save(user);
    }
    
    public User unsubscribe(User user, Long topicId) {
    	 boolean alreadySubscribed = user.getTopics().stream().anyMatch(o -> o.getId().equals(topicId));
         if(!alreadySubscribed) {
             throw new BadRequestException();
         }
         
     	Topic topic = this.topicRepository.findById(topicId).orElse(null);
     	if(topic == null) {
             throw new NotFoundException();
     	}
     	
     	user.setTopics(user.getTopics().stream().filter(t -> !t.getId().equals(topicId)).collect(Collectors.toList()));

         return userRepository.save(user);
    }
}