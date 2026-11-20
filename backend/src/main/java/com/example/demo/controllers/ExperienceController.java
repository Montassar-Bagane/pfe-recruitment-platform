package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Experience;
import com.example.demo.services.ExperienceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/experiences")
@RequiredArgsConstructor
public class ExperienceController 
{
	@Autowired
	ExperienceService experienceServ;
	
	@PostMapping("/AddExperiences/{idcandidate}")
	public List<Experience> AddExperiences(@RequestBody List<Experience> experiences, @PathVariable Long idcandidate) 
	{
		return experienceServ.AddExperiences(experiences, idcandidate);
	}
	
	@GetMapping("/getExperiencesByCandidateId/{CandidateId}")
	public List<Experience> getExperiencesByCandidateId(@PathVariable Long CandidateId) 
	{
		return experienceServ.getExperiencesByCandidateId(CandidateId);
	}
	
	@PostMapping("/updateExperience/{id}")
	public Experience updateExperience(@RequestBody Experience experience, @PathVariable Long id) 
	{
		return experienceServ.updateExperience(experience, id);
	}
	
	@DeleteMapping("/deleteExperience/{id}")
	public void deleteExperience(@PathVariable Long id) 
	{
		experienceServ.deleteExperience(id);
	}
	
}
