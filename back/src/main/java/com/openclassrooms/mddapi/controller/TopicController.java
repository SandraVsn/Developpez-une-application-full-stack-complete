package com.openclassrooms.mddapi.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.service.TopicService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(path = "${apiPrefix}/topic")
@Tag(name = "Topic", description = "API for Topic CRUD operations")
public class TopicController {

    private TopicService topicService;
    private ModelMapper modelMapper;

    @Autowired
    public TopicController(TopicService topicService, ModelMapper modelMapper) {
        this.topicService = topicService;
        this.modelMapper = modelMapper;
    }

    @Operation(summary = "Get a Topic by its id")
    @GetMapping("/{id}")
    public ResponseEntity<?> getTopic(@PathVariable("id") final Long id) {
        try {
            Optional<Topic> topic = this.topicService.getTopic(Long.valueOf(id));

            if (topic.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(modelMapper.map(topic.get(), TopicDto.class));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(summary = "Get all Topics")
    @GetMapping()
    public ResponseEntity<?> getTopics() {
        Iterable<Topic> topics = this.topicService.getTopics();

        List<TopicDto> topicDtos = StreamSupport.stream(topics.spliterator(), false)
                .map(topic -> {
                    return modelMapper.map(topic, TopicDto.class);
                })
                .toList();
        return ResponseEntity.ok().body(topicDtos);
    }

}
