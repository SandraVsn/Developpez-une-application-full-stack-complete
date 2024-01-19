package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class CreatePostDto {

    private String title;

    private String content;

    private Long topicId;

}
