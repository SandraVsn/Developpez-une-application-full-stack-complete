package com.openclassrooms.mddapi.controller;

import java.security.Principal;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.CreatePostDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.AuthService;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.TopicService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin
@RestController
@RequestMapping(path = "${apiPrefix}/post")
@Tag(name = "Post", description = "API for Post CRUD operations")
public class PostController {

    private PostService postService;
    private AuthService authService;
    private TopicService topicService;

    private ModelMapper modelMapper;

    @Autowired
    public PostController(PostService postService, AuthService authService, TopicService topicService,
            ModelMapper modelMapper) {
        this.postService = postService;
        this.authService = authService;
        this.topicService = topicService;
        this.modelMapper = modelMapper;
    }

    @Operation(summary = "Get a Post by its id")
    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") final Long id) {
        try {
            Optional<Post> post = this.postService.getPost(Long.valueOf(id));

            if (post.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(modelMapper.map(post.get(), PostDto.class));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(summary = "Get all Posts")
    @GetMapping()
    public ResponseEntity<?> getPosts() {
        Iterable<Post> posts = postService.getPosts();
        List<PostDto> postDtos = StreamSupport.stream(posts.spliterator(), false)
                .map(post -> {
                    return modelMapper.map(post, PostDto.class);
                })
                .toList();

        return ResponseEntity.ok().body(postDtos);
    }

    @Operation(summary = "Creates a new Post")
    @PostMapping()
    public ResponseEntity<?> createPost(
            Principal principal,
            @RequestBody CreatePostDto createPostDto) {
        User user = authService.getMe(principal.getName());
        Optional<Topic> topic = topicService.getTopic(createPostDto.getTopicId());

        Post post = modelMapper.map(createPostDto, Post.class);
        post.setUser(user);
        post.setTopic(topic.get());
        post.setId(null);

        Post savedPost = postService.savePost(post);

        return ResponseEntity.ok().body(modelMapper.map(savedPost, PostDto.class));

    }

}