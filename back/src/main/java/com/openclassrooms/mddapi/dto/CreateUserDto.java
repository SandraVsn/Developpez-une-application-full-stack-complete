package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class CreateUserDto {
	
	private String userName;

	private String email;
	
	private String password;

}
