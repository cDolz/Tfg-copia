import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsService } from '../../../services/events.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shared-event-register-form',
  templateUrl: './event-register-form.component.html',
  styleUrl: './event-register-form.component.scss'
})
export class EventRegisterFormComponent implements OnDestroy {

  form!: FormGroup<any>;
  private unsubscribe$ = new Subject<void>();
  errorMessage!: string;

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
    const formData = new FormData();

    const file = this.form.get('image')?.value;
    if (file) {
      formData.append('image', file);
    }

    this.eventsService.register(formData).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: () => {
        console.log('Evento registrado');
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
