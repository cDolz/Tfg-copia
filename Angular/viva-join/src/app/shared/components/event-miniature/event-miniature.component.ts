import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-event-miniature',
  templateUrl: './event-miniature.component.html',
  styleUrl: './event-miniature.component.scss'
})
export class EventMiniatureComponent {
  @Input()
  title!: string;
  @Input()
  file!: string;
  @Input()
  route!: string;
}
