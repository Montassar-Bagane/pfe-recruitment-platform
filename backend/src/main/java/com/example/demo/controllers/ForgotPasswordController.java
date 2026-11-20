package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.ChangePassword;
import com.example.demo.services.ForgotPasswordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/ForgotPassword")
public class ForgotPasswordController 
{
	@Autowired
	ForgotPasswordService forgotPasswordServ;
	
	@PostMapping("/verifyEmail/{email}")
	public void verifyEmail(@PathVariable String email) 
	{
		forgotPasswordServ.verifyEmail(email);
	}
	
	@PostMapping("/verifyOtp/{otp}/{email}")
	public void verifyOtp(@PathVariable Long otp, @PathVariable String email) 
	{
		forgotPasswordServ.verifyOtp(otp, email);
	}
	
	@PostMapping("/changePassword/{email}")
	public void changePassword(@RequestBody ChangePassword changePassword, @PathVariable String email) 
	{	
		forgotPasswordServ.changePassword(changePassword, email);
	}
	
}
