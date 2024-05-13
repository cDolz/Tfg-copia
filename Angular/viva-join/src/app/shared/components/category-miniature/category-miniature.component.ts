import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-category-miniature',
  templateUrl: './category-miniature.component.html',
  styleUrl: './category-miniature.component.scss'
})
export class CategoryMiniatureComponent {
  @Input()
  route!: string;
  @Input()
  label!: string;
}
