package com.openclassrooms.mddapi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

import lombok.Data;

@Data
@Service
public class TopicService {

    private TopicRepository topicRepository;

    @Autowired
    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public Optional<Topic> getTopic(final Long id) {
        return topicRepository.findById(id);
    }

    public Iterable<Topic> getTopics() {
        return topicRepository.findAll();
    }

}
