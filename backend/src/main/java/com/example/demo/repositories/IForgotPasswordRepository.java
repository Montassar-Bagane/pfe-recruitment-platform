package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.ForgotPassword;
import com.example.demo.models.User;

public interface IForgotPasswordRepository extends JpaRepository<ForgotPassword, Long>  
{
	@Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.user= ?2")
	Optional<ForgotPassword> findByOtpAndUser(Long otp, User user);
}
