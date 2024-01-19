package com.openclassrooms.mddapi.repository;

import org.springframework.data.repository.CrudRepository;

import com.openclassrooms.mddapi.model.Post;

public interface PostRepository extends CrudRepository<Post, Long> {

}
