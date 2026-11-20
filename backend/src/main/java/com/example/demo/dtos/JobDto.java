package com.example.demo.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JobDto 
{
	private Long id;
	
	private String company;
	
	private String title;
	
	private String type;
	
	private String salary;
	
	private String unit;
	
	private String timeType;
	
	private String description;
	
	private Integer submit;
}
