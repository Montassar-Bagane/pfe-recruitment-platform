package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.JobDto;
import com.example.demo.models.Application;
import com.example.demo.models.Job;
import com.example.demo.models.Recruiter;
import com.example.demo.models.User;
import com.example.demo.repositories.IApplicationRepository;
import com.example.demo.repositories.IJobRepository;
import com.example.demo.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobService
{
	@Autowired
	IJobRepository jobRep;
	
	@Autowired
	IUserRepository userRep;
	
	@Autowired
	IApplicationRepository applicationRep;
	
	@Autowired
	ApplicationService applicationServ;

	public Job addJob(Job job, Long idrecruiter) 
	{
		Optional<User> user=userRep.findById(idrecruiter);
		Recruiter recruiter=(Recruiter) user.get();
		job.setRecruiter(recruiter);
		return jobRep.save(job);
	}
	
	public Optional<Job> getJobById(Long id) 
	{
		return jobRep.findById(id);
	}
	
	public List<Job> getAllJobs() 
	{
		return jobRep.findAll();
		
	}
	
	public int getNumberOfJobs() 
	{
		List<Job> jobs=jobRep.findAll();
		return jobs.size();
	}
	
	public List<JobDto> getJobsByRecruiterId(Long idrecruiter) 
	{
		List<Job> jobs = jobRep.findByRecruiterId(idrecruiter);
		return jobs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
	
	private JobDto convertToDTO(Job job) 
	{
		JobDto dto = new JobDto();
        dto.setId(job.getId());
        dto.setCompany(job.getCompany());
        dto.setTitle(job.getTitle());
        dto.setType(job.getType());
        dto.setSalary(job.getSalary());
        dto.setUnit(job.getUnit());
        dto.setTimeType(job.getTimeType());
        dto.setDescription(job.getDescription());
        dto.setSubmit(applicationServ.getNumberApplicationsByJobId(job.getId()));
        return dto;
    }

	public Job updateJob(Job job, Long idrecruiter, Long idjob) 
	{
		Job job2=jobRep.findById(idjob).get();
			if(job2.getRecruiter().getId().equals(idrecruiter))
			{
				job2.setCompany(job.getCompany());
				job2.setTitle(job.getTitle());
				job2.setType(job.getType());
				job2.setSalary(job.getSalary());
				job2.setUnit(job.getUnit());
				job2.setTimeType(job.getTimeType());
				job2.setDescription(job.getDescription());
			}
		return jobRep.save(job2);
	}

	public void deleteJob(Long idjob) 
	{
		List<Application> applications = applicationRep.findByJobId(idjob);
		applicationRep.deleteAll(applications);
		jobRep.deleteById(idjob);
	}

	
}
