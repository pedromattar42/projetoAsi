import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { ChangeDetectorRef, HostBinding  } from '@angular/core';

import { DropdownModule } from 'primeng/dropdown';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/shared/services/general.service';
import { finalize, take } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    DividerModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0.2 })),
      transition(':enter', [
        animate(
          '1000ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export default class LoginComponent implements OnInit {
  loading = false
  #builder = inject(FormBuilder);
  model: FormGroup = new FormGroup({});
  #breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  tamanhoDaImagem = '500px';
  #cd = inject(ChangeDetectorRef);
  messageService = inject(MessageService)
  #router = inject(Router)
  idiomas: any[] | undefined;

  constructor(private service: GeneralService){
  }

  get email() {
    return this.model.get('email')?.value
  }

  ngOnInit(): void {
    this.model = this.#getNewModel();
    this.#breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.tamanhoDaImagem = '400px';
        }
        if (state.breakpoints[Breakpoints.Small]) {
          this.tamanhoDaImagem = '200px';
        }
        if (state.breakpoints[Breakpoints.Medium]) {
          this.tamanhoDaImagem = '300px';
        }
        if (state.breakpoints[Breakpoints.Large]) {
          this.tamanhoDaImagem = '400px';
        }
        if (state.breakpoints[Breakpoints.XLarge]) {
          this.tamanhoDaImagem = '500px';
        }
        this.#cd.markForCheck();
      });
  }

  #getNewModel() {
    return this.#builder.group({
      email: [undefined, [Validators.required, this.emailValidator]],
      senha: [undefined, [Validators.required]],
    });
  }
  emailValidator = (control: FormControl) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(control.value);

    return isValid ? null : { emailInvalido: true };
  };

  public submit() {
    const dto = this.model.getRawValue();
    this.loading = true
    this.service
      .login(dto)
      .pipe(take(1), finalize(() => this.loading = false))
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Login realizado com sucesso!',
          });
          this.#router.navigate(['home'], {queryParams: {nome: res.nome}})
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao realizar login. Tente novamente.',
          });
        }
      );
  }

  redirectToRegister(){
    this.#router.navigate(['cadastro'])
  }
}
