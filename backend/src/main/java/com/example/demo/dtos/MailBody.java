package com.example.demo.dtos;

import lombok.Builder;

@Builder
public record MailBody(String to, String subject, String text) 
{

}
