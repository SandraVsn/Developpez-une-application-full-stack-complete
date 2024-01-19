package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.openclassrooms.mddapi.model.Topic;

import lombok.Data;

@Data
public class UserDto {
    private Long id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String name;

    private String email;

    private List<Topic> topics;
}
