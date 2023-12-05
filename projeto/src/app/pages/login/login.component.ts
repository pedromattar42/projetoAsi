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
  FormsModule
} from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0.2 })),
      transition(':enter', [
        animate('1000ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export default class LoginComponent implements OnInit {
  #builder = inject(FormBuilder);
  model: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.model = this.#getNewModel();
  }

  #getNewModel() {
    return this.#builder.group({
      email: [undefined, [Validators.required]],
      senha: [undefined, [Validators.required]],
      idioma: [undefined, [Validators.required]],
    });
  }
}
