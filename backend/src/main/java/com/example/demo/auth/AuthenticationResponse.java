package com.example.demo.auth;

import com.example.demo.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse 
{
	private String token;
	
	private Long id;
	
	private Role authority;
}
