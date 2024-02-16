package com.openclassrooms.mddapi.repository;

import org.springframework.data.repository.CrudRepository;

import com.openclassrooms.mddapi.model.Comment;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    public Iterable<Comment> findAllByPostIdOrderByUpdatedAtAsc(Long postId);

}
