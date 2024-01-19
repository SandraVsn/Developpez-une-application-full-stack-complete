package com.openclassrooms.mddapi.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;

import lombok.Data;

@Data
@Service
public class PostService {

    private PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPost(final Long id) {
        return postRepository.findById(id);
    }

    public Post savePost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

}
