package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;

import lombok.Data;

@Data
public class CommentDto {

    private Long id;

    private String content;

    private User user;

    private Post post;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
