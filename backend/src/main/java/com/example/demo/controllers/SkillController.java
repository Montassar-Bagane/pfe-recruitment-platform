package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Skill;
import com.example.demo.services.SkillService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController 
{
	@Autowired
	SkillService skillServ;
	
	@PostMapping("/AddSkills/{idcandidate}")
	public List<Skill> AddSkills(@RequestBody List<Skill> skills, @PathVariable Long idcandidate) 
	{
		return skillServ.AddSkills(skills, idcandidate);
	}
	
	@GetMapping("/getSkillsByCandidateId/{CandidateId}")
	public List<Skill> getSkillsByCandidateId(@PathVariable Long CandidateId) 
	{
		return skillServ.getSkillsByCandidateId(CandidateId);
	}

	@DeleteMapping("/deleteSkillById/{id}")
	public void deleteSkillById(@PathVariable Long id)
	{
		skillServ.deleteSkillById(id);
	}
	
}
