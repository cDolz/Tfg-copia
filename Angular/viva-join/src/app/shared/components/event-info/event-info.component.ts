import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.scss'
})
export class EventInfoComponent {
  @Input() title!: string;
  @Input() file!: string;
  @Input() description!: string;
  @Input() duration!: any;
  @Input() location!: any;
  @Input() categorization!: any;
}
