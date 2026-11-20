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
public class ApplicationToRecruiterDto 
{
	private Long id;
	
	private String firstname;
	
	private String lastname;
	
	private String email;
	
	private String phone;
	
	private String description;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	private String cv;
}
