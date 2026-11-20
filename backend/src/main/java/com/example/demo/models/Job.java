package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "jobs")
public class Job 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String company;
	private String title;
	private String type;
	private String salary;
	private String unit;
	private String timeType;
	private String description;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn
	private Recruiter recruiter;
	
	@JsonIgnore
	@ManyToMany(mappedBy = "listjobs")
	private List<Candidate> listcandidates = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "job")
	private List<Speciality> listSpecialties = new ArrayList<>();
}
