package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Speciality;

@Repository
public interface ISpecialityRepository extends JpaRepository<Speciality, Long> 
{

}
