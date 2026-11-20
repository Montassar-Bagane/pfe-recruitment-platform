package com.example.demo.services;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Candidate;
import com.example.demo.models.Job;
import com.example.demo.models.Status;
import com.example.demo.dtos.ApplicationToCandidateDto;
import com.example.demo.dtos.ApplicationToRecruiterDto;
import com.example.demo.models.Application;
import com.example.demo.models.User;
import com.example.demo.repositories.IApplicationRepository;
import com.example.demo.repositories.IJobRepository;
import com.example.demo.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService
{
	@Autowired
	private IApplicationRepository applicationRep;
	
	@Autowired
	private IUserRepository userRep;
	
	@Autowired
	private IJobRepository jobRep;

	@Value("${application.upload.cv-dir:uploads/cv}")
	private String cvUploadDir;

	public Application addApplication(String description, MultipartFile cv, Long idcandidate, Long idjob) throws IOException 
	{
		Optional<User> user = userRep.findById(idcandidate);
		Candidate candidate = (Candidate) user.orElseThrow(() -> new IllegalArgumentException("Candidate not found with id: " + idcandidate));
		Job job = jobRep.findById(idjob).orElseThrow(() -> new IllegalArgumentException("Job not found with id: " + idjob));
		
		Application application2 = new Application();
		application2.setCandidate(candidate);
		application2.setJob(job);
		application2.setDescription(description);
		
		Application savedApplication = applicationRep.save(application2);
		
		Path path = Paths.get(cvUploadDir).toAbsolutePath().normalize();
		if (!Files.exists(path)) {
			Files.createDirectories(path);
		}
		
		String cleanFirst = candidate.getFirstname() != null ? candidate.getFirstname().replaceAll("[^a-zA-Z0-9]", "") : "candidate";
		String cleanLast = candidate.getLastname() != null ? candidate.getLastname().replaceAll("[^a-zA-Z0-9]", "") : "";
		String fileName = savedApplication.getId() + "_" + cleanFirst + "-" + cleanLast + ".pdf";
		Path filePath = path.resolve(fileName);
		Files.copy(cv.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
		
		savedApplication.setCv(filePath.toUri().toString());
		return applicationRep.save(savedApplication);
	}
	
	public byte[] getCV(Long id) throws IOException {
		Application application = applicationRep.findById(id).orElseThrow(() -> new IllegalArgumentException("Application not found with id: " + id));
		String filePath = application.getCv();
		if (filePath == null) {
			return new byte[0];
		}
		Path path;
		if (filePath.startsWith("file:")) {
			path = Path.of(URI.create(filePath));
		} else {
			path = Paths.get(filePath);
		}
		if (!Files.exists(path)) {
			return new byte[0];
		}
		return Files.readAllBytes(path);
	}
	
	public List<Application> getAllApplications() 
	{
		return applicationRep.findAll();
	}
	
	public int getNumberOfApplications() 
	{
		List<Application> applications = applicationRep.findAll();
		return applications.size();
	}
	
	public List<ApplicationToCandidateDto> getApplicationsByCandidateId(Long CandidateId) 
	{
		 List<Application> applications = applicationRep.findByCandidateId(CandidateId);
		 return applications.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
	
	private ApplicationToCandidateDto convertToDTO(Application application) 
	{
		ApplicationToCandidateDto dto = new ApplicationToCandidateDto();
        dto.setId(application.getId());
        dto.setStatus(application.getStatus());
        if (application.getJob() != null) {
            dto.setTitle(application.getJob().getTitle());
            dto.setCompany(application.getJob().getCompany());
            dto.setType(application.getJob().getType());
        }
        return dto;
    }
		
	public List<ApplicationToRecruiterDto> getApplicationsByJobId(Long JobId) 
	{
		List<Application> applications = applicationRep.findByJobId(JobId);
		return applications.stream().map(this::convertToDTO2).collect(Collectors.toList());
    }
	
	private ApplicationToRecruiterDto convertToDTO2(Application application) 
	{
		ApplicationToRecruiterDto dto = new ApplicationToRecruiterDto();
        dto.setId(application.getId());
        if (application.getCandidate() != null) {
            dto.setFirstname(application.getCandidate().getFirstname());
            dto.setLastname(application.getCandidate().getLastname());
            dto.setEmail(application.getCandidate().getEmail());
            dto.setPhone(application.getCandidate().getPhone());
        }
        dto.setDescription(application.getDescription());
        dto.setStatus(application.getStatus());
        dto.setCv(application.getCv());
        return dto;
    }
	
	public int getNumberApplicationsByJobId(Long jobId) {
		List<Application> applications = applicationRep.findByJobId(jobId);
		return applications.size();
	}
	
	public Application updateApplicationToAccepted(Long idapplication) 
	{	
		Application application2 = applicationRep.findById(idapplication).orElseThrow();
		application2.setStatus(Status.ACCEPTED);	
		return applicationRep.save(application2);
	}
	
	public Application updateApplicationToRefused(Long idapplication) 
	{	
		Application application2 = applicationRep.findById(idapplication).orElseThrow();
		application2.setStatus(Status.REFUSED);
		return applicationRep.save(application2);
	}
	
	public void deleteApplication(Long idcandidate, Long idapplication) 
	{
		Application application = applicationRep.findById(idapplication).orElse(null);
		if (application != null && application.getCandidate() != null && application.getCandidate().getId().equals(idcandidate))
		{
			applicationRep.deleteById(idapplication);
		}
	}
}
