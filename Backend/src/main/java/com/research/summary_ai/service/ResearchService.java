package com.research.summary_ai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.research.summary_ai.GeminiResponse;
import com.research.summary_ai.entity.ResearchRequest;
import com.research.summary_ai.entity.ResearchResult;
import com.research.summary_ai.repository.ResearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ResearchService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;
    private final ResearchRepository researchRepository;

    public String processContent(ResearchRequest request) {
        String prompt = buildPrompt(request);

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", prompt)
                        })
                }
        );

        try {
            WebClient webClient = webClientBuilder.build();
            String response = webClient.post()
                    .uri(geminiApiUrl + geminiApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            System.out.println("Gemini raw response: " + response);

            // Extract readable text
            String resultText = extractTextFromResponse(response);

            // Generate short title (like a chat name)
            String generatedTitle = generateTitle(request.getContent(), request.getOperation());

            // Save to MySQL
            ResearchResult record = new ResearchResult();
            record.setOperation(request.getOperation());
            record.setContent(request.getContent());
            record.setResponse(resultText);
            record.setTitle(generatedTitle);
            researchRepository.save(record);




            return resultText;

        } catch (Exception e) {
            System.err.println("Error during processing: " + e.getMessage());
            return "Error: " + e.getMessage();
        }
    }

    // helper method
    private String generateTitle(String content, String operation) {
        if (content == null || content.isEmpty()) return operation + " Result";
        String clean = content.replaceAll("\\s+", " ").trim();
        String[] words = clean.split(" ");
        String shortText = String.join(" ", java.util.Arrays.copyOfRange(words, 0, Math.min(8, words.length)));
        return operation.substring(0, 1).toUpperCase() + operation.substring(1)
                + ": " + shortText + (words.length > 8 ? "..." : "");
    }


    private String buildPrompt(ResearchRequest request) {
        StringBuilder prompt = new StringBuilder();
        switch (request.getOperation()) {
            case "summarize":
                prompt.append("Provide a clear and concise summary of the following text:\n\n");
                break;
            case "suggest":
                prompt.append("Based on the following content, suggest related topics and further reading:\n\n");
                break;
            default:
                throw new IllegalArgumentException("Unknown Operation: " + request.getOperation());
        }
        prompt.append(request.getContent());
        return prompt.toString();
    }

    public String extractTextFromResponse(String response) {
        try {
            GeminiResponse geminiResponse = objectMapper.readValue(response, GeminiResponse.class);
            if (geminiResponse.getCandidates() != null && !geminiResponse.getCandidates().isEmpty()) {
                GeminiResponse.Candidate firstCandidate = geminiResponse.getCandidates().get(0);
                if (firstCandidate.getContent() != null &&
                        firstCandidate.getContent().getParts() != null &&
                        !firstCandidate.getContent().getParts().isEmpty()) {
                    return firstCandidate.getContent().getParts().get(0).getText();
                }
            }
            return "No content found in Gemini response.";
        } catch (Exception e) {
            System.err.println("Error parsing Gemini response: " + e.getMessage());
            return response; // fallback: save full raw response
        }
    }

    public List<ResearchResult> getAllHistory() {
        List<ResearchResult> results = researchRepository.findAll();
        results.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt())); // latest first
        return results;
    }
}
