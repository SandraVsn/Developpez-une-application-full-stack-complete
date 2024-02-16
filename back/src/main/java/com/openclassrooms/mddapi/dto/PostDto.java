package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PostDto {

    private Long id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String title;

    private String content;

    private String userName;

    private String topicName;

}
