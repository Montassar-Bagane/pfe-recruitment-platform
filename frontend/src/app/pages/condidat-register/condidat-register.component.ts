import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Experience, RegisterRequest, Skill } from 'src/app/services/models';
import { AuthenticationControllerService, ExperienceControllerService, SkillControllerService } from 'src/app/services/services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-condidat-register',
  templateUrl: './condidat-register.component.html',
  styleUrls: ['./condidat-register.component.css']
})
export class CondidatRegisterComponent implements OnInit {
  
  current = 0;

  inputContent = '';

  contentArray: Skill[] = [];

  form: FormGroup =  this.fb.group({
    experiences: this.fb.array([]) // Initialize the experiences array
  });

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    let registerRequest: RegisterRequest = {
      firstname: this.validateForm.value.firstName,
      lastname: this.validateForm.value.lastName,
      email: this.validateForm.value.email,
      password: this.validateForm.value.password,
      phone: this.validateForm.value.phoneNumber
    };

    this.authService.registerCandidate({
      body: registerRequest
    }).subscribe({
      error: () => {
        alert('Email already exists')
      },
      next: (res) => {
        localStorage.setItem('id', res.id as unknown as string); // assuming the response contains the id
    
        // Now that we have the id, we can add skills and experiences
        this.skillService.addSkills({
          idcandidate: localStorage.getItem('id') as unknown as number,
          body: this.contentArray
        }).subscribe({
          next: () => {
            this.experienceService.addExperiences({
              idcandidate: localStorage.getItem('id') as unknown as number,
              body: this.form.value.experiences.map((experience: any) => {
                return {
                  title: experience.title,
                  organization: experience.enterprise,
                  city: experience.city,
                  start_date: experience.startDate,
                  end_date: experience.endDate,
                  description: experience.description
                } as Experience;
              })
            }).subscribe({
              next: () => {
                this.router.navigate(['/login']);
                localStorage.clear(); // Clear the local storage
              }
            });
          }
        });
      }
    });
  }

  validateForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  });

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
  constructor(private fb: FormBuilder, 
              private router: Router, 
              private authService:AuthenticationControllerService, 
              private skillService: SkillControllerService,
              private experienceService: ExperienceControllerService) {}

  get experiences(): FormArray {
    return this.form.get('experiences') as FormArray;
  }

  addExperience() {
    const experienceGroup = this.fb.group({
      title: ['', Validators.required],
      enterprise: ['', Validators.required],
      city: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });
    this.experiences.push(experienceGroup);
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;
      console.log('Form data:', formData);
      this.validateForm.reset();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const newSkill: Skill = {
        name: this.inputContent
      };
      this.contentArray.push(newSkill);
      this.inputContent = ''; // Clear the input field
    }
  }
  
  removeItem(index: number) {
    this.contentArray.splice(index, 1);
    //console.log(this.contentArray)
  }

}
