package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DiscriminatorValue("Recruiter")
public class Recruiter extends User 
{	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Builder.Default
	@JsonIgnore
	@OneToMany(mappedBy = "recruiter")
	private List<Job> listJobs = new ArrayList<>();
}
