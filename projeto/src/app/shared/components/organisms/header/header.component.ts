import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() nome = ''
  #route = inject(ActivatedRoute)
  #router = inject(Router)
  ngOnInit(): void {
    const {nome} = this.#route.snapshot.queryParams
    this.nome = nome
  }

  redirect() {
    this.#router.navigate(['login'])
  }
}
