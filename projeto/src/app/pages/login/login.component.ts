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
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

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
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
