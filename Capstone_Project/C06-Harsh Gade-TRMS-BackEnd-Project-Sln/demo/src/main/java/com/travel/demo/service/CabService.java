package com.travel.demo.service;

import com.travel.demo.entity.Cab;
import com.travel.demo.repository.CabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CabService {

    @Autowired
    private CabRepository cabRepository;

    public Cab createCab(Cab cab) {
        String newId = generateNewId();
        cab.setId(newId);  // Set custom ID
        return cabRepository.save(cab);
    }

    public List<Cab> getAllCabs() {
        return cabRepository.findAll();
    }

    public Optional<Cab> getCabById(String id) {
        return cabRepository.findById(id);
    }

    public Cab updateCab(String id, Cab cabDetails) {
        return cabRepository.findById(id)
                .map(cab -> {
                    cab.setModel(cabDetails.getModel());
                    cab.setLicensePlate(cabDetails.getLicensePlate());
                    cab.setCapacity(cabDetails.getCapacity());
                    cab.setPricePerDay(cabDetails.getPricePerDay());
                    return cabRepository.save(cab);
                })
                .orElseThrow(() -> new RuntimeException("Cab not found with id " + id));
    }

    public void deleteCab(String id) {
        cabRepository.deleteById(id);
    }

    // Helper Method to Generate ID
    private String generateNewId() {
        List<Cab> cabs = cabRepository.findAll();
        int maxId = cabs.stream()
                .mapToInt(cab -> Integer.parseInt(cab.getId().substring(1)))
                .max()
                .orElse(0);
        return String.format("C%04d", maxId + 1);  // Format as "C0001"
    }
}
