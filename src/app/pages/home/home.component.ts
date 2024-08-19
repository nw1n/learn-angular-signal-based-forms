import { C } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
  template: `<h1>HomeX</h1>
    <mat-form-field>
      <input
        matInput
        placeholder="First Name"
        #firstNameControl="ngModel"
        [ngModel]="firstNameUc()"
        (ngModelChange)="setFirstName($event, firstNameControl)"
        required
      />
      <mat-error *ngIf="firstNameControl.hasError('required')">
        This field is required
      </mat-error>
    </mat-form-field>
    <mat-form-field>
      <input
        matInput
        placeholder="Last Name"
        #lastNameControl="ngModel"
        [ngModel]="lastNameUc()"
        (ngModelChange)="setLastName($event, lastNameControl)"
        minlength="4"
      />
      <mat-error *ngIf="lastNameControl.hasError('minlength')">
        This field must be at least 4 characters
      </mat-error>
    </mat-form-field>

    <div id="effects" #effectsEl>XY</div>

    <h3>Full Name: {{ fullName() }}</h3>
    <style>
      #effects {
        width: 100px;
        height: 100px;
        background-color: red;
      }
      #effects.active {
        background-color: green
      }
    </style>
    `,

})
export class HomeComponent {
  @ViewChild('effectsEl') effectsEl: any;

  firstName = signal('');
  lastName = signal('');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  firstNameUc = computed(() => this.firstName().toUpperCase());
  lastNameUc = computed(() => this.lastName().toUpperCase());

  setFirstName(value: string, control: any) {
    const val = value.toLowerCase();
    console.log('setFirstName', val);
    this.firstName.set(val);
  }
  setLastName(value: string, control: any) {
    const val = value.toLowerCase();
    console.log('setLastName', val);
    // Only update when the input is valid
    if (control.hasError('minlength')) {
      console.log('minlength error');
      return;
    }
    this.lastName.set(val);
  }

  toggleVisualEffect() {
    // it seems necessary to use nativeElement and not change state of component
    const el = this.effectsEl.nativeElement;
    if (el.classList.contains('active')) {
      el.classList.remove('active');
    } else {
      el.classList.add('active');
    }
  }

  constructor() {
    // Effects are used here just to demonstrate triggering side effects on state changes.
    // E.G. manually changing the background color of a dom element. Other example use cases for effects would be writing to local storage api etc.
    effect(() => {
      console.log(`The current firstname is: ${this.firstName()}`);
      this.toggleVisualEffect();
    });
    effect(() => {
      // Note: This effect will only run when the input is valid, since it depends on the lastName signal being set
      console.log(`Valid input. The current lastname is: ${this.lastName()}`);
      this.toggleVisualEffect();
    });
  }
}
