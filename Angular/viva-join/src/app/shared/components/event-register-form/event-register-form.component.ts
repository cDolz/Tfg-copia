import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-shared-event-register-form',
  templateUrl: './event-register-form.component.html',
  styleUrl: './event-register-form.component.scss'
})
export class EventRegisterFormComponent {

  form!: FormGroup<any>;

  constructor(private formBuilder: FormBuilder, private eventsService: EventsService) { 
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      image: [null],
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file: File = target.files[0];
      this.form.get('image')!.setValue(file);
    }
  }

  onSubmit() {
    this.eventsService.register(this.form.value).subscribe(




}
