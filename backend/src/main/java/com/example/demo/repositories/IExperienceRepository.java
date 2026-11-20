package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Experience;

@Repository
public interface IExperienceRepository extends JpaRepository<Experience, Long>
{
	List<Experience> findByCandidateId(Long candidateId);
}
