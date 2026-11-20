package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.auth.RegisterRequest;
import com.example.demo.models.Application;
import com.example.demo.models.Candidate;
import com.example.demo.models.Experience;
import com.example.demo.models.Job;
import com.example.demo.models.Recruiter;
import com.example.demo.models.Role;
import com.example.demo.models.Skill;
import com.example.demo.models.User;
import com.example.demo.repositories.IApplicationRepository;
import com.example.demo.repositories.IExperienceRepository;
import com.example.demo.repositories.IJobRepository;
import com.example.demo.repositories.ISkillRepository;
import com.example.demo.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountManagementService 
{		
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	private IUserRepository userRep;
	
	@Autowired
	private IJobRepository jobRep;
	
	@Autowired
	private IApplicationRepository applicationRep;
	
	@Autowired
	private IExperienceRepository experienceRep;
	
	@Autowired
	private ISkillRepository skillRep;
	
	public List<User> getAllUsers() 
	{
		return userRep.findAll();
	}
	
	public List<Recruiter> getAllRecruiters()
	{
		return userRep.findAllRecruiters();
	}
	
	public List<Candidate> getAllCandidates()
	{
		return userRep.findAllCandidates();
	}
	
	public int getNumberOfRecruiters() 
	{
		List<Recruiter> recruiters=userRep.findAllRecruiters();
		return recruiters.size();
	}
	
	public int getNumberOfCandidates() 
	{
		List<Candidate> candidates=userRep.findAllCandidates();
		return candidates.size();
	}
	
	public User getUserById(Long id) 
	{
		Optional<User> user = userRep.findById(id);
		if(user.isPresent()) 
		{
			return user.get();
		}
		return null;
	}
	
	public User updateUser(Long id, RegisterRequest request) 
	{		
		User user=userRep.findById(id).get();
		user.setFirstname(request.getFirstname());
		user.setLastname(request.getLastname());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setPhone(request.getPhone());		
		return userRep.save(user);
	}
	
	public void deleteUser(Long id) 
	{
		User user=userRep.findById(id).get();
		if(user.getRole() == Role.RECRUITER) 
		{
			Recruiter recruiter = (Recruiter) user;
			List<Job> jobs = recruiter.getListJobs();
			for (Job job : jobs) 
			{
	            List<Application> applications = applicationRep.findByJob(job);
	            applicationRep.deleteAll(applications);
	        }
			jobRep.deleteAll(jobs);
			userRep.delete(user);
		}
		if(user.getRole() == Role.CANDIDATE) 
		{
			Candidate candidate = (Candidate) user;
			List<Application> applications = applicationRep.findByCandidateId(id);
			applicationRep.deleteAll(applications);
			
			List<Experience> candidateExperiences = candidate.getListExperience();
			experienceRep.deleteAll(candidateExperiences);
			
			List<Skill> candidateSkills = candidate.getListSkill();
			skillRep.deleteAll(candidateSkills);
			
			userRep.delete(user);
		}
	}
}
