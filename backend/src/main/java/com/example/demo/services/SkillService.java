package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Candidate;
import com.example.demo.models.Skill;
import com.example.demo.models.User;
import com.example.demo.repositories.ISkillRepository;
import com.example.demo.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SkillService 
{
	@Autowired
	ISkillRepository skillRep;
	
	@Autowired
	IUserRepository userRep;
	
	public List<Skill> AddSkills(List<Skill> skills, Long idcandidate) 
	{
		Optional<User> user = userRep.findById(idcandidate);
		
		Candidate candidate = (Candidate) user.get();
		
		for (Skill skill : skills) 
		{
			skill.setCandidate(candidate);
			skillRep.save(skill);
		}
		return skills;
	}

	public List<Skill> getSkillsByCandidateId(Long CandidateId) 
	{
		return skillRep.findByCandidateId(CandidateId);
	}

	public void deleteSkillById(Long id) 
	{
		skillRep.deleteById(id);	
	}

}
