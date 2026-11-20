package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Candidate;
import com.example.demo.models.Experience;
import com.example.demo.models.User;
import com.example.demo.repositories.IExperienceRepository;
import com.example.demo.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExperienceService 
{
	@Autowired
	IExperienceRepository experienceRep;
	
	@Autowired
	IUserRepository userRep;
	
	public List<Experience> AddExperiences(List<Experience> experiences, Long idcandidate) 
	{
		Optional<User> user = userRep.findById(idcandidate);
		
		Candidate candidate = (Candidate) user.get();
		
		for (Experience experience : experiences) 
		{
			experience.setCandidate(candidate);
			experienceRep.save(experience);
		}
		return experiences;
	}
	
	public List<Experience> getExperiencesByCandidateId(Long CandidateId) 
	{
		return experienceRep.findByCandidateId(CandidateId);
	}

	public Experience updateExperience(Experience experience, Long id) 
	{
		Experience experience2 = experienceRep.findById(id).get();
		experience2.setTitle(experience.getTitle());
		experience2.setOrganization(experience.getOrganization());
		experience2.setCity(experience.getCity());
		experience2.setStart_date(experience.getStart_date());
		experience2.setEnd_date(experience.getEnd_date());
		experience2.setDescription(experience.getDescription());
		return experienceRep.save(experience2);
	}

	public void deleteExperience(Long id)
	{
		experienceRep.deleteById(id);
	}
	
	
}
