package com.research.summary_ai.controller;

import com.research.summary_ai.entity.ResearchRequest;
import com.research.summary_ai.entity.ResearchResult;
import com.research.summary_ai.service.ResearchService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ResearchController {

    private final ResearchService researchService;

    // === Process AI Request and Save ===
    @PostMapping("/process")
    public ResponseEntity<String> processContent(@RequestBody ResearchRequest request) {
        String result = researchService.processContent(request);
        return ResponseEntity.ok(result);
    }

    // === Get All Saved History ===
    @GetMapping("/history")
    public ResponseEntity<List<ResearchResult>> getAllHistory() {
        List<ResearchResult> history = researchService.getAllHistory();
        return ResponseEntity.ok(history);
    }
}
