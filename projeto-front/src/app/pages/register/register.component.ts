import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
import { finalize, take } from 'rxjs';
import { GeneralService } from 'src/app/shared/services/general.service';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';

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
    ToastModule,
    ProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  standalone: true,
})
export default class RegisterComponent implements OnInit {
  model: FormGroup = new FormGroup({});
  #builder = inject(FormBuilder);
  #router = inject(Router);
  messageService = inject(MessageService)
  #service = inject(GeneralService)
  idiomas: any[] | undefined;
  #cd = inject(ChangeDetectorRef);

  loading = false

  get confirmarSenha() {
    return this.model.get('confirmarSenha')?.value;
  }

  get email() {
    return this.model.get('email')?.value
  }

  ngOnInit(): void {
    this.model = this.#getNewModel();
    this.#loadCountries()
  }

  #getNewModel() {
    return this.#builder.group({
      email: [undefined, [Validators.required, this.emailValidator]],
      nome: [undefined, [Validators.required]],
      senha: [undefined, [Validators.required]],
      disciplina: [undefined, [Validators.required]],
      confirmarSenha: [
        undefined,
        [Validators.required, this.confirmarSenhaValidator.bind(this)],
      ],
    });
  }

  emailValidator = (control: FormControl) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(control.value);

    return isValid ? null : { emailInvalido: true };
  };

  confirmarSenhaValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const senha = this.model.get('senha')?.value;
    const confirmarSenha = control.value;

    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  }

  #loadCountries() {
    this.idiomas = [
      { name: 'Português - Brasileiro', reference: 'PT' },
      { name: 'Português - Angolano', reference: 'CN' },
      { name: 'Francês', reference: 'FR' },
      { name: 'Alemanha', reference: 'DE' },
      { name: 'Japônes', reference: 'JP' },
      { name: 'Espanhol', reference: 'ES' },
      { name: 'Inglês - Estados Unidos', reference: 'US' },
    ];
  }

  redirect() {
    this.#router.navigate(['login'])
  }

    submit() {
      const dto = this.model.getRawValue();
      delete dto.confirmarSenha

      this.loading = true
      this.#service
        .cadastrar(dto)
        .pipe(take(1), finalize(() => this.loading = false))
        .subscribe(
          (_) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário cadastrado com sucesso!',
            });
            this.#cd.markForCheck()
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao cadastrar usuário. Tente novamente.',
            });
          }
        );
    }
}
