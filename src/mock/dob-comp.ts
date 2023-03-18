import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-of-birth',
  templateUrl: './date-of-birth.component.html',
  styleUrls: ['./date-of-birth.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateOfBirthComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateOfBirthComponent),
      multi: true
    }
  ]
})
export class DateOfBirthComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() requiredError: string = 'Date of birth is required';
  @Input() minAgeError: string = 'You must be at least 18 years old';
  @Input() maxAgeError: string = 'You cannot be more than 120 years old';
  @Input() futureDateError: string = 'Date of birth cannot be in the future';
  @Output() onTouched: EventEmitter<void> = new EventEmitter();

  dateOfBirth: Date;
  disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  validate(control: FormControl) {
    const value = control.value;
    if (!value) {
      return { required: true };
    }
    const dateOfBirth = moment(value, 'YYYY-MM-DD');
    if (!dateOfBirth.isValid()) {
      return { invalid: true };
    }
    const age = moment().diff(dateOfBirth, 'years');
    if (age < 18) {
      return { minAge: true };
    }
    if (age > 120) {
      return { maxAge: true };
    }
    if (dateOfBirth.isAfter(moment())) {
      return { futureDate: true };
    }
    return null;
  }

  registerOnChange(fn: any) {
    this.onChange = (value: Date) => {
      this.dateOfBirth = value;
      fn(value);
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched.emit();
    this.onTouched.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(obj: any) {
    if (obj) {
      this.dateOfBirth = obj;
    }
  }

  onChange: any = () => { };

  getErrorMessage() {
    if (!this.dateOfBirth) {
      return this.requiredError;
    }
    const dateOfBirth = moment(this.dateOfBirth, 'YYYY-MM-DD');
    const age = moment().diff(dateOfBirth, 'years');
    if (age < 18) {
      return this.minAgeError;
    }
    if (age > 120) {
      return this.maxAgeError;
    }
    if (dateOfBirth.isAfter(moment())) {
      return this.futureDateError;
    }

    return '';
  }

  get formControl() {
    return new FormControl(this.dateOfBirth, [
      Validators.required,
      this.validate.bind(this)
    ]);
  }
}
