package com.example.demo.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.MailBody;

@Service
public class EmailService 
{
	private static final Logger log = LoggerFactory.getLogger(EmailService.class);
	private final JavaMailSender javaMailSender;

	@Value("${spring.mail.username:noreply@recruiterhub.com}")
	private String fromEmail;
	
	public EmailService(JavaMailSender javaMailSender) 
	{
		this.javaMailSender = javaMailSender;
	}
	
	public void sendSimpleMessage(MailBody mailBody) 
	{
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(mailBody.to());
			message.setFrom(fromEmail);
			message.setSubject(mailBody.subject());
			message.setText(mailBody.text());
			
			javaMailSender.send(message);
			log.info("Email sent successfully to: {}", mailBody.to());
		} catch (Exception e) {
			log.warn("Failed to send email to {}: {}. OTP / Message content: [{}]", mailBody.to(), e.getMessage(), mailBody.text());
		}
	}
}
