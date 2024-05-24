import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../../../services/common.service';
import { EventsService } from '../../../services/events.service';
import { MyValidators } from '../../../utils/validators/validators';
import { EventRegisterData, EventRegisterDateData } from '../../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-event-register-form',
  templateUrl: './event-register-form.component.html',
  styleUrl: './event-register-form.component.scss'
})
export class EventRegisterFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  register!: EventRegisterData;
  datesRegister!: EventRegisterDateData;
  arrayOfDates: EventRegisterDateData[] = [];

  private unsubscribe$ = new Subject<void>();
  errorMessage!: string;
  selectedFile!: File;
  categories: string[] = this.eventsService.getCategories();
  actualDate: Date = new Date();
  months: { name: string, number: string }[] = this.commonService.generateMonths();
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  durationHours: number[] = Array.from({ length: 6 }, (_, i) => i);
  minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5);
  years: number[] = [];

  showTitleErrors: boolean = false;
  showDescriptionErrors: boolean = false;
  showDurationErrors: boolean = false;
  showMaxParticipantsErrors: boolean = false;
  showLocationErrors: boolean = false;
  showOrganizerErrors: boolean = false;
  showFileErrors: boolean = false;
  showPeriodicityErrors: boolean = false;
  showDatesErrors: boolean = false;

  constructor(private formBuilder: FormBuilder, private eventsService: EventsService, private commonService: CommonService, private router: Router, private cdr: ChangeDetectorRef) {  
  }

  ngOnInit() {
    this.initForm();
  }

  get f() {
    return this.form.controls;
  }

  get fDates() {
    return (this.form.get('dates') as FormArray).controls;
  }

  get fDatesArrays() {
    return (this.form.get('dates') as FormArray).controls as FormArray[];
  }

  markDurationAsTouched() {
    this.form.get('durationHours')?.markAsTouched();
    this.form.get('durationMinutes')?.markAsTouched();
  }

  generateNextSixMonths() {
    const currentMonth = this.actualDate.getMonth();
    const nextSixMonths = [];

    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth + i) % 12;
      nextSixMonths.push(this.months[monthIndex]);
    }
    return nextSixMonths;
  }

  changeYear(control: AbstractControl | null, i: number) {
    const selectedMonth = parseInt(control?.value);
    const currentMonth = this.actualDate.getMonth();
    const currentYear = this.actualDate.getFullYear();
    this.years[i] = selectedMonth < currentMonth ? currentYear + 1 : currentYear;
  }

  generateDays(control: AbstractControl | null) {
    if (control?.value === (this.actualDate.getMonth() + 1).toString().padStart(2, '0')) {
      return Array.from({ length: 31 - this.actualDate.getDate() }, (_, i) => i + this.actualDate.getDate() + 1);
    } else {
      return Array.from({ length: 31 }, (_, i) => i + 1);
    }
  }

  updateNumberOfEntries() {
    (this.form.get('dates') as FormArray).clear();
    for (let i = 0; i < this.form.get('periodicity')?.value; i++) {
      (this.form.get('dates') as FormArray).push(this.formBuilder.array([]));
      ((this.form.get('dates') as FormArray).at(i) as FormArray).push(this.formBuilder.control((this.actualDate.getDate() + 1).toString().padStart(2, '0'), Validators.required));
      ((this.form.get('dates') as FormArray).at(i) as FormArray).push(this.formBuilder.control((this.actualDate.getMonth() + 1).toString().padStart(2, '0')));
      ((this.form.get('dates') as FormArray).at(i) as FormArray).push(this.formBuilder.control('00', Validators.required));
      ((this.form.get('dates') as FormArray).at(i) as FormArray).push(this.formBuilder.control('00', Validators.required));
    }
    this.years = Array(this.fDatesArrays.length).fill(this.actualDate.getFullYear());
    this.cdr.detectChanges();
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), MyValidators.trimValueAndCheck]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(1300), MyValidators.trimValueAndCheck]],
      durationHours: ['00', Validators.required],
      durationMinutes: ['00', Validators.required],
      maxParticipants: ['1', [Validators.required, Validators.min(1), MyValidators.maxParticipants]],
      location: ['', [Validators.required, MyValidators.trimValueAndCheck]],
      categorization: this.categories[0],
      organizer: ['', [Validators.required, MyValidators.trimValueAndCheck]],
      file: ['', [Validators.required]],
      periodicity: ['1', [Validators.required, Validators.min(1), MyValidators.maxEntries]],
      dates: this.formBuilder.array([], MyValidators.datesRegisterUnique(() => this.years))
    }, { validators: [MyValidators.minDuration] });
    this.updateNumberOfEntries();
  }

  // se valida si el archivo seleccionado es una imagen
  onFileSelect($event: Event) {
    const fileInput = $event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileType = file.type;
      if (RegExp(/image\/*/).exec(fileType) == null) {
        // El archivo no es una imagen, marca el control como inválido
        this.form.get('file')?.setErrors({ notImage: true });
      } else {
        // El archivo es una imagen, limpia los errores
        this.form.get('file')?.setErrors(null);
      }
      this.selectedFile = file;
    }
  }
// se envía el formulario al servicio para registrar el evento
  onSubmit() {    
    const { title, description, durationHours, durationMinutes, maxParticipants, location, categorization, organizer, dates } = this.form.value;
    this.arrayOfDates = [];
    for (let i = 0; i < dates.length; i++) {
      this.datesRegister = {
        date: new Date(this.years[i], dates[i][1] - 1, dates[i][0], dates[i][2], dates[i][3])                 
      };      
      this.arrayOfDates.push(this.datesRegister);
    }
    this.register = {
      title,
      description,
      duration: `${durationHours}:${durationMinutes}`,
      location,
      categorization,
      organizer,
      maxParticipants,
      dates: this.arrayOfDates
    };        
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('event', JSON.stringify(this.register));
    this.eventsService.register(formData).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: () => {
        this.router.navigate(['home/success'], { queryParams: { from: this.router.url } });
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
