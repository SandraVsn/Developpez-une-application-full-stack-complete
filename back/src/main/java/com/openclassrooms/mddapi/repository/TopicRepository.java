package com.openclassrooms.mddapi.repository;

import org.springframework.data.repository.CrudRepository;

import com.openclassrooms.mddapi.model.Topic;

public interface TopicRepository extends CrudRepository<Topic, Long> {

}
