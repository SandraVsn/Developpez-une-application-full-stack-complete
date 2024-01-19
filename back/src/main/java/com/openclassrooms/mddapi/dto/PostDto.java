package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;

import lombok.Data;

@Data
public class PostDto {

    private Long id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String title;

    private String content;

    private User user;

    private Topic topic;

}
