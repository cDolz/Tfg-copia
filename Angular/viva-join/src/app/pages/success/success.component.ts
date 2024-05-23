import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit {
  fromUrl!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fromUrl = this.router.url;
  }

  redirect() {
    this.router.navigate(['/']);
  }
}
