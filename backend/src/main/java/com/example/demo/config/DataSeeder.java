package com.example.demo.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.models.Admin;
import com.example.demo.models.Candidate;
import com.example.demo.models.Job;
import com.example.demo.models.Recruiter;
import com.example.demo.models.Role;
import com.example.demo.repositories.IJobRepository;
import com.example.demo.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);
    
    private final IUserRepository userRepository;
    private final IJobRepository jobRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already contains data, skipping seed.");
            return;
        }

        log.info("Seeding initial demo data...");

        // 1. Admin
        Admin admin = Admin.builder()
                .firstname("System")
                .lastname("Administrator")
                .email("admin@recruiterhub.com")
                .password(passwordEncoder.encode("Admin123!"))
                .phone("+1-555-0100")
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);

        // 2. Recruiter
        Recruiter recruiter = Recruiter.builder()
                .firstname("Sarah")
                .lastname("Jenkins")
                .email("recruiter@techcorp.com")
                .password(passwordEncoder.encode("Recruiter123!"))
                .phone("+1-555-0101")
                .role(Role.RECRUITER)
                .build();
        Recruiter savedRecruiter = userRepository.save(recruiter);

        // 3. Candidate
        Candidate candidate = Candidate.builder()
                .firstname("Alex")
                .lastname("Morgan")
                .email("candidate@example.com")
                .password(passwordEncoder.encode("Candidate123!"))
                .phone("+1-555-0102")
                .role(Role.CANDIDATE)
                .build();
        userRepository.save(candidate);

        // 4. Sample Jobs
        Job job1 = new Job();
        job1.setTitle("Senior Full-Stack Engineer");
        job1.setCompany("TechCorp Global");
        job1.setType("Full-Time");
        job1.setSalary("95000");
        job1.setUnit("USD/year");
        job1.setTimeType("Remote");
        job1.setDescription("Seeking a Senior Full-Stack Engineer proficient in Spring Boot, Angular, and cloud-native architecture to build high-scale talent platforms.");
        job1.setRecruiter(savedRecruiter);
        jobRepository.save(job1);

        Job job2 = new Job();
        job2.setTitle("DevOps & Cloud Specialist");
        job2.setCompany("CloudScale Inc");
        job2.setType("Full-Time");
        job2.setSalary("105000");
        job2.setUnit("USD/year");
        job2.setTimeType("Hybrid");
        job2.setDescription("Lead CI/CD pipeline automation, Docker containerization, Kubernetes orchestration, and monitoring infrastructure.");
        job2.setRecruiter(savedRecruiter);
        jobRepository.save(job2);

        Job job3 = new Job();
        job3.setTitle("Frontend Angular Developer");
        job3.setCompany("ModernWeb Studio");
        job3.setType("Contract");
        job3.setSalary("50");
        job3.setUnit("USD/hour");
        job3.setTimeType("Remote");
        job3.setDescription("Build responsive and accessible dashboards using Angular 13+, TypeScript, RxJS, and modern design systems.");
        job3.setRecruiter(savedRecruiter);
        jobRepository.save(job3);

        log.info("Demo accounts & jobs seeded successfully!");
        log.info("Admin: admin@recruiterhub.com / Admin123!");
        log.info("Recruiter: recruiter@techcorp.com / Recruiter123!");
        log.info("Candidate: candidate@example.com / Candidate123!");
    }
}
