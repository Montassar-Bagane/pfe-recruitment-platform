package com.example.demo.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@ToString
@DiscriminatorValue("Admin")
public class Admin extends User 
{/**
	 * 
	 */
	private static final long serialVersionUID = 1L;	
	
}
