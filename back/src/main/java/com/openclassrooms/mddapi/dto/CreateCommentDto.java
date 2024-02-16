package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class CreateCommentDto {
	
    private String content;

    private Long postId;

}
