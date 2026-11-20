package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Application;
import com.example.demo.models.Job;

@Repository
public interface IApplicationRepository extends JpaRepository<Application, Long> 
{
	List<Application> findByCandidateId(Long candidateId);

	List<Application> findByJobId(Long jobId);

	List<Application> findByJob(Job job);

}
