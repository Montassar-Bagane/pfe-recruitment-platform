package com.example.demo.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.MailBody;
import com.example.demo.models.ChangePassword;
import com.example.demo.models.ForgotPassword;
import com.example.demo.models.User;
import com.example.demo.repositories.IForgotPasswordRepository;
import com.example.demo.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService 
{
	@Autowired
	private IUserRepository userRep;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private IForgotPasswordRepository forgotPasswordRep;
	
	private final PasswordEncoder passwordEncoder;
	
	
	public void verifyEmail(String email) 
	{
		User user = userRep.findByEmail(email)
				.orElseThrow();
		
		Long otp= otpGenerator();
		
		MailBody mailBody = MailBody.builder()
				.to(email)
				.subject("OTP for Forgot Password request")
				.text("This your OTP for your Forgot Password request : " + otp)
				.build();
		
		ForgotPassword forgotPassword = ForgotPassword.builder()
				.otp(otp)
				.user(user)
				.build();
		
		emailService.sendSimpleMessage(mailBody);
		forgotPasswordRep.save(forgotPassword);
	}
	
	public void verifyOtp(Long otp, String email) 
	{
		User user = userRep.findByEmail(email)
				.orElseThrow();
		
		ForgotPassword fp = forgotPasswordRep.findByOtpAndUser(otp, user)
				.orElseThrow();
		
		forgotPasswordRep.deleteById(fp.getId());
	}
	
	public void changePassword(ChangePassword changePassword, String email) 
	{	
		String encodedPassword = passwordEncoder.encode(changePassword.password());
		userRep.updatePassword(email, encodedPassword);
	}
	
	private Long otpGenerator() 
	{
		Random random = new Random();
		return random.nextLong(100_000, 999_999);
	}
}
