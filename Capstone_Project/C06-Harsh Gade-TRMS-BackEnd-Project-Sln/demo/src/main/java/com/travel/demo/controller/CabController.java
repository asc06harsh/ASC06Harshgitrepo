package com.travel.demo.controller;

import com.travel.demo.entity.Cab;
import com.travel.demo.service.CabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cabs")
@CrossOrigin(origins = "http://localhost:4200")
public class CabController {

    @Autowired
    private CabService cabService;

    @PostMapping
    public ResponseEntity<Cab> createCab(@RequestBody Cab cab) {
        Cab newCab = cabService.createCab(cab);
        return ResponseEntity.ok(newCab);
    }

    @GetMapping
    public ResponseEntity<List<Cab>> getAllCabs() {
        List<Cab> cabs = cabService.getAllCabs();
        return ResponseEntity.ok(cabs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cab> getCabById(@PathVariable String id) {
        return cabService.getCabById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cab> updateCab(@PathVariable String id, @RequestBody Cab cabDetails) {
        Cab updatedCab = cabService.updateCab(id, cabDetails);
        return ResponseEntity.ok(updatedCab);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCab(@PathVariable String id) {
        cabService.deleteCab(id);
        return ResponseEntity.noContent().build();
    }
}
