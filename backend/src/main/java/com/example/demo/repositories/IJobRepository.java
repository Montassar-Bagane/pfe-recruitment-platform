package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Job;

@Repository
public interface IJobRepository extends JpaRepository<Job, Long>
{
	List<Job> findByRecruiterId(Long RecruiterId);
}
