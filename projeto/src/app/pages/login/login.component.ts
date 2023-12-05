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
} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
  ],
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
  #builder = inject(FormBuilder);
  model: FormGroup = new FormGroup({});
  #breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  tamanhoDaImagem = '500px';
  #cd = inject(ChangeDetectorRef);
  countries: any[] | undefined;
  selectedCountry: {name: string, code: string} = {name: '', code: ''};

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
          this.tamanhoDaImagem = '100px';
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
    this.#loadCountries();
  }

  #loadCountries() {
    this.countries = [
      { name: 'Português - Brasileiro', code: 'BR' },
      { name: 'Português - Angolano', code: 'CN' },
      { name: 'Francês', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'Japônes', code: 'JP' },
      { name: 'Espanhol', code: 'ES' },
      { name: 'Inglês - Estados Unidos', code: 'US' },
    ];
  }

  #getNewModel() {
    return this.#builder.group({
      email: [undefined, [Validators.required]],
      senha: [undefined, [Validators.required]],
      idioma: [undefined, [Validators.required]],
    });
  }

  public submit() {
    const dto = this.model.getRawValue();
  }
}
