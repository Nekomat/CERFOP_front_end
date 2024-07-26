import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrl: './mon-compte.component.scss',
})
export class MonCompteComponent {
  identityForm!: FormGroup;
  credentialsForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.identityForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });

    this.credentialsForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
    });

    this.passwordForm = this.fb.group({
      lastPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.passwordForm.controls['checkPassword'].updateValueAndValidity()
    );
  }

  submitIdentityForm(): void {
    for (const i in this.identityForm.controls) {
      if (this.identityForm.controls.hasOwnProperty(i)) {
        this.identityForm.controls[i].markAsDirty();
        this.identityForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.identityForm.valid) {
      console.log('Identity Form Submitted', this.identityForm.value);
    }
  }

  submitCredentialsForm(): void {
    for (const i in this.credentialsForm.controls) {
      if (this.credentialsForm.controls.hasOwnProperty(i)) {
        this.credentialsForm.controls[i].markAsDirty();
        this.credentialsForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.credentialsForm.valid) {
      console.log('Credentials Form Submitted', this.credentialsForm.value);
    }
  }

  submitPasswordForm(): void {
    for (const i in this.passwordForm.controls) {
      if (this.passwordForm.controls.hasOwnProperty(i)) {
        this.passwordForm.controls[i].markAsDirty();
        this.passwordForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.passwordForm.valid) {
      console.log('Password Form Submitted', this.passwordForm.value);
    }
  }

  confirmationValidator = (control: FormGroup): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value !== this.passwordForm.controls['newPassword'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
