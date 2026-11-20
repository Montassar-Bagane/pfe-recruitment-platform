package com.example.demo.dtos;

import com.example.demo.models.Status;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApplicationToCandidateDto 
{	
	private long id;
	
	private String title;
	
	private String company;
	
	private String type;
	
	@Enumerated(EnumType.STRING)
	private Status status;
}
