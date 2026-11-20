package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Candidate;
import com.example.demo.models.Recruiter;
import com.example.demo.models.User;

import jakarta.transaction.Transactional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> 
{
	Optional<User> findByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE TYPE(u) = Recruiter")
    List<Recruiter> findAllRecruiters();
	
	@Query("SELECT u FROM User u WHERE TYPE(u) = Candidate")
    List<Candidate> findAllCandidates();
	
	@Transactional
	@Modifying
	@Query("UPDATE User u SET u.password = ?2 WHERE u.email = ?1")
	void updatePassword(String email, String password);
	
}
