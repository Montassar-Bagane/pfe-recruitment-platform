package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@DiscriminatorValue("Candidate")
public class Candidate extends User 
{	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Builder.Default
	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "applications",
    joinColumns = @JoinColumn(name="candidate_id"),
    inverseJoinColumns = @JoinColumn(name="job_id"))
	private List<Job> listjobs = new ArrayList<>();
	
	@Builder.Default
	@JsonIgnore
	@OneToMany(mappedBy = "candidate")
	private List<Experience> listExperience = new ArrayList<>();
	
	@Builder.Default
	@JsonIgnore
	@OneToMany(mappedBy = "candidate")
	private List<Skill> listSkill = new ArrayList<>();
}
