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

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.CreateCommentDto;
import com.openclassrooms.mddapi.dto.CreatePostDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.AuthService;
import com.openclassrooms.mddapi.service.CommentService;
import com.openclassrooms.mddapi.service.PostService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin
@RestController
@RequestMapping(path = "${apiPrefix}/comment")
@Tag(name = "Comment", description = "API for Comment CRUD operations")
public class CommentController {
	
	private CommentService commentService;
    private AuthService authService;
    private PostService postService;
    private ModelMapper modelMapper;

    @Autowired
    public CommentController(CommentService commentService, PostService postService, AuthService authService, ModelMapper modelMapper) {
        this.postService = postService;
        this.authService = authService;
        this.commentService = commentService;
        this.modelMapper = modelMapper;
    }
	
    @Operation(summary = "Get all Comment by post id")
    @GetMapping("/post/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") final Long id) {
    	
    	 Iterable<Comment> comments = commentService.getAllCommentsByPostId(id);
         List<CommentDto> commentDtos = StreamSupport.stream(comments.spliterator(), false)
                 .map(comment -> {
                     return modelMapper.map(comment, CommentDto.class);
                 })
                 .toList();

         return ResponseEntity.ok().body(commentDtos);
    }
    
    @Operation(summary = "Creates a new Comment")
    @PostMapping()
    public ResponseEntity<?> createPost(
            Principal principal,
            @RequestBody CreateCommentDto createCommentDto) {
    	
    	
        User user = authService.getMe(principal.getName());
        Optional<Post> post = postService.getPost(createCommentDto.getPostId());

        Comment comment = modelMapper.map(createCommentDto, Comment.class);

        comment.setUser(user);
        comment.setPost(post.get());
        comment.setId(null);
        
        commentService.saveComment(comment);
        
	   	Iterable<Comment> comments = commentService.getAllCommentsByPostId(createCommentDto.getPostId());
	    List<CommentDto> commentDtos = StreamSupport.stream(comments.spliterator(), false)
	    		.map(c -> {
	                 return modelMapper.map(c, CommentDto.class);
	             })
	            .toList();

     return ResponseEntity.ok().body(commentDtos);

    }
}
