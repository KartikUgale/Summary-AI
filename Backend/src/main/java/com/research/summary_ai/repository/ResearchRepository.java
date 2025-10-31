package com.research.summary_ai.repository;

import com.research.summary_ai.entity.ResearchResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchRepository extends JpaRepository<ResearchResult, Long> {
}
