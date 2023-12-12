import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
  ],
  standalone: true,
})
export default class RegisterComponent implements OnInit {
  model: FormGroup = new FormGroup({});
  #builder = inject(FormBuilder);

  get confirmarSenha(){
    return this.model.get('confirmarSenha')?.value
  }

  ngOnInit(): void {
    this.model = this.#getNewModel();
  }

  #getNewModel() {
    return this.#builder.group({
      email: ['', [Validators.required, this.emailValidator]],
      nome: [undefined, [Validators.required]],
      senha: [undefined, [Validators.required]],
      confirmarSenha: [undefined, [Validators.required, this.confirmarSenhaValidator.bind(this)]],
    });
  }

  emailValidator = (control: FormControl) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(control.value);

    return isValid ? null : { 'emailInvalido': true };
  };

  confirmarSenhaValidator(control: FormControl): { [key: string]: boolean } | null {
    const senha = this.model.get('senha')?.value;
    const confirmarSenha = control.value;

    return senha === confirmarSenha ? null : { 'senhasDiferentes': true };
  }

  submit() {
  }
}
