package com.example.demo.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dtos.ApplicationToCandidateDto;
import com.example.demo.dtos.ApplicationToRecruiterDto;
import com.example.demo.models.Application;
import com.example.demo.services.ApplicationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController 
{
	@Autowired
	ApplicationService applicationServ;
	
	@PostMapping(value="/addApplication/{idcandidate}/{idjob}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Application addApplication(@RequestParam("description") String description, 
									  @RequestParam("file") MultipartFile cv, 
									  @PathVariable Long idcandidate, 
									  @PathVariable Long idjob) throws IOException 
	{
	    return applicationServ.addApplication(description, cv, idcandidate, idjob);
	}
	
	@GetMapping(value="/getCV/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
	public byte[] getCV(@PathVariable Long id) throws IOException {
		return applicationServ.getCV(id);
	}
	
	@GetMapping("/getAllApplications")
	public List<Application> getAllApplications() {
		return applicationServ.getAllApplications();
	}
	
	@GetMapping("/getNumberOfApplications")
	public int getNumberOfApplications() 
	{
		return applicationServ.getNumberOfApplications();
	}
	
	@GetMapping("/getApplicationsByCandidateId/{CandidateId}")
	public List<ApplicationToCandidateDto> getApplicationsByCandidateId(@PathVariable Long CandidateId) 
	{
		return applicationServ.getApplicationsByCandidateId(CandidateId);
	}
	
	@GetMapping("/getApplicationsByJobId/{JobId}")
	public List<ApplicationToRecruiterDto> getApplicationsByJobId(@PathVariable Long JobId) 
	{
		return applicationServ.getApplicationsByJobId(JobId);
	}
	
	@GetMapping("/getNumberApplicationsByJobId/{JobId}")
	public int getNumberApplicationsByJobId(@PathVariable Long JobId) 
	{
		return applicationServ.getNumberApplicationsByJobId(JobId);
	}
	
	@PostMapping("/updateApplicationToAccepted/{idapplication}")
	public Application updateApplicationToAccepted(@PathVariable Long idapplication) 
	{
		return applicationServ.updateApplicationToAccepted(idapplication);
	}
	
	@PostMapping("/updateApplicationToRefused/{idapplication}")
	public Application updateApplicationToRefused(@PathVariable Long idapplication) 
	{
		return applicationServ.updateApplicationToRefused(idapplication);
	}
	
	@DeleteMapping("/deleteApplication/{idcandidate}/{idapplication}")
	public void deleteApplication(@PathVariable Long idcandidate,@PathVariable Long idapplication)
	{
		applicationServ.deleteApplication(idcandidate, idapplication);
	}
}
