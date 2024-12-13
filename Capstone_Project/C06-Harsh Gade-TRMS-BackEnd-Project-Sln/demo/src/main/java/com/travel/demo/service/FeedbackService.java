package com.travel.demo.service;


import com.travel.demo.entity.Feedback;
import com.travel.demo.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Optional<Feedback> getFeedbackById(Long id) {
        return feedbackRepository.findById(id);
    }

    public Feedback updateFeedback(Long id, Feedback feedbackDetails) {
        return feedbackRepository.findById(id)
                .map(feedback -> {
                    feedback.setName(feedbackDetails.getName());
                    feedback.setEmail(feedbackDetails.getEmail());
                    feedback.setMessage(feedbackDetails.getMessage());
                    return feedbackRepository.save(feedback);
                })
                .orElseThrow(() -> new RuntimeException("Feedback not found with id " + id));
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
