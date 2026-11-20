import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import { AccountManagementControllerService, ExperienceControllerService, SkillControllerService } from 'src/app/services/services';
import { Experience, RegisterRequest, Skill } from 'src/app/services/models';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authority=localStorage.getItem('authority');

  Experiences!: Experience[];

  inputContent = '';

  contentArray: Skill[] = [];

  contactForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    confirmPassword: ['']
  });

  editForm = this.fb.group({
    title: ['', [Validators.required]],
    organization: ['', [Validators.required]],
    city: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  isEditModalVisible = false;

  isAddModalVisible = false;

  selectedJobOffer: any;

  constructor(private fb: FormBuilder, 
              private modalService: NzModalService,
              private AccountManagementService: AccountManagementControllerService,
              private SkillService: SkillControllerService,
              private ExperienceService: ExperienceControllerService) { }

  checkPasswords(): void {
    const password = this.contactForm.value.password;
  const confirmPassword = this.contactForm.value.confirmPassword;

  if (password !== confirmPassword) {
    // Set a custom validation error for confirm password
    this.contactForm.get('confirmPassword')!.setErrors({ mustMatch: true });
  } else {
    // Clear the validation error if passwords match
    this.contactForm.get('confirmPassword')!.setErrors(null);
  }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      let updatedUser: RegisterRequest = {
        firstname: this.contactForm.value.firstname,
        lastname: this.contactForm.value.lastname,
        phone: this.contactForm.value.phone,
        email: this.contactForm.value.email,
        password: this.contactForm.value.password
      }
      this.AccountManagementService.updateUser({
        id: localStorage.getItem('id') as unknown as number,
        body: updatedUser
      }).subscribe({
        next: () => {

        }
      })
      //console.log('Form submitted:', this.contactForm.value);
    } else {
      alert('Form is invalid');
    }
  }

  openEditModal(offer: any): void {
    this.selectedJobOffer = offer;
    this.editForm.patchValue(offer);
    this.isEditModalVisible = true;
  }

  openAddModal(): void {
    this.isAddModalVisible = true;
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.ExperienceService.updateExperience({
        id: this.selectedJobOffer.id as unknown as number,
        body: this.editForm.value
      }).subscribe({
        next: () => {
          // Reset the form
          this.editForm.reset();
          this.ExperienceService.getExperiencesByCandidateId({
            CandidateId: localStorage.getItem('id') as unknown as number
          }).subscribe({
            next: (res) => {
              this.Experiences = res;
            }
          })
        }
      })
      //Object.assign(this.selectedJobOffer, this.editForm.value);
      //console.log('Updated job offer:', this.selectedJobOffer);
      this.isEditModalVisible = false;
    } else {
      //console.log('Form is invalid');
    }
  }

  onSaveAdd(): void {
    if (this.editForm.valid) {
      this.ExperienceService.addExperiences({
        idcandidate: localStorage.getItem('id') as unknown as number,
        body: [this.editForm.value]
      }).subscribe({
        next: () => {
          // Reset the form
          this.editForm.reset();
          this.ExperienceService.getExperiencesByCandidateId({
            CandidateId: localStorage.getItem('id') as unknown as number
          }).subscribe({
            next: (res) => {
              this.Experiences = res;
            }
          })
        }
      })
      //Object.assign(this.selectedJobOffer, this.editForm.value);
      //console.log('Updated job offer:', this.selectedJobOffer);
      this.isAddModalVisible = false;
    } else {
      //console.log('Form is invalid');
    }
  }

  handleCancel(): void {
    this.isEditModalVisible = false; // Hide the modal
    // Reset the form
    this.editForm.reset();
  }

  handleCancelAdd(): void {
    this.isAddModalVisible = false; // Hide the modal
  }

  confirmDelete(experienceId: number) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this experience?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger:true,
      nzOnOk: () => this.ExperienceService.deleteExperience({
        id: experienceId
      }).subscribe({
        next: () => {
          this.ExperienceService.getExperiencesByCandidateId({
            CandidateId: localStorage.getItem('id') as unknown as number
          }).subscribe({
            next: (res) => {
              this.Experiences = res;
            }
          })
        }
      }),
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      //this.contentArray.push(this.inputContent);
      this.SkillService.addSkills({
        idcandidate: localStorage.getItem('id') as unknown as number,
        body: [{ name: this.inputContent }] // Wrap the inputContent in an array of Skill objects
      }).subscribe({
        next: () => {
          this.SkillService.getSkillsByCandidateId({
            CandidateId: localStorage.getItem('id') as unknown as number
          }).subscribe({
            next: (res) => {
              this.contentArray = res;
            }
          })
        }
      })
      this.inputContent = ''; // Clear the input field
    }
  }

  removeItem(index: number) {
    //this.contentArray.splice(index, 1);
    //console.log(this.contentArray)
    this.SkillService.deleteSkillById({
      id: this.contentArray[index].id as unknown as number
    }).subscribe({
      next: () => {
        this.SkillService.getSkillsByCandidateId({
          CandidateId: localStorage.getItem('id') as unknown as number
        }).subscribe({
          next: (res) => {
            this.contentArray = res;
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.AccountManagementService.getUserById({
      id: localStorage.getItem('id') as unknown as number
    }).subscribe({
      next: (res) => {
        //this.contactForm.patchValue(res);
        this.contactForm.get('firstname')?.setValue(res.firstname);
        this.contactForm.get('lastname')?.setValue(res.lastname);
        this.contactForm.get('phone')?.setValue(res.phone);
        this.contactForm.get('email')?.setValue(res.email);
      }
    
    })

    if(this.authority === 'CANDIDATE'){
    this.SkillService.getSkillsByCandidateId({
      CandidateId: localStorage.getItem('id') as unknown as number
    }).subscribe({
      next: (res) => {
        this.contentArray = res;
      }
    })

    this.ExperienceService.getExperiencesByCandidateId({
      CandidateId: localStorage.getItem('id') as unknown as number
    }).subscribe({
      next: (res) => {
        this.Experiences = res;
      }
    })
  }
  }

}
