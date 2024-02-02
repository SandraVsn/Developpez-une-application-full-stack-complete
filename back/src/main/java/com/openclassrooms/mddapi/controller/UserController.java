package com.openclassrooms.mddapi.controller;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(path = "${apiPrefix}/user")
@Tag(name = "User", description = "API for User CRUD operations")
public class UserController {

    private UserService userService;
    private ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Operation(summary = "Get a User by its id")
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") final Long id) {
        try {
            Optional<User> user = this.userService.getUser(Long.valueOf(id));

            if (user.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(modelMapper.map(user.get(), UserDto.class));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("subscribe/{topicId}")
    public ResponseEntity<?> subscribe(Principal principal, @PathVariable("topicId") String topicId) {
        try {
            User user = authService.getMe(principal.getName());
            User updatedUser = this.userService.subscribe(user, Long.parseLong(topicId));

            return ResponseEntity.ok().body(modelMapper.map(updatedUser, UserDto.class));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("unsubscribe/{topicId}")
    public ResponseEntity<?> unsubscribe(Principal principal, @PathVariable("topicId") String topicId) {
        try {
            User user = authService.getMe(principal.getName());
            User updatedUser = this.userService.unsubscribe(user, Long.parseLong(topicId));

            return ResponseEntity.ok().body(modelMapper.map(updatedUser, UserDto.class));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
