package com.openclassrooms.mddapi.repository;

import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.User;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    public User findByEmail(String email);
}
