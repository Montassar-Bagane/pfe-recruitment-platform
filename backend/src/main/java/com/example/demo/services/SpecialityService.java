package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Job;
import com.example.demo.models.Speciality;
import com.example.demo.repositories.IJobRepository;
import com.example.demo.repositories.ISpecialityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpecialityService
{
	@Autowired
	ISpecialityRepository specialityRep;
	
	@Autowired
	IJobRepository jobRep;
	
	public Speciality addSpeciality(Speciality speciality, Long idjob) 
	{
		Job job=jobRep.findById(idjob).get();
		speciality.setJob(job);
		return specialityRep.save(speciality);
	}
}
