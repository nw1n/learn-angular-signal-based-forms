# Learn signal based forms

This is a demo project consisting of a single component that demonstrates how angular signals can be used with forms.

The demo showcases transformation (uppercase, lowercase) of the data that flows in and out of the form, so it does not rely on simple two-way binding of the form value, but instead works with custom emit function for output and a computed property for input.

It includes form validation.

Note that it uses template driven forms instead of reactive forms, since reactive forms are designed for a RXJS based approach, and not for signals.

This demo is inspired by this blog post [https://zoaibkhan.com/blog/how-to-use-signals-with-angular-forms/](https://zoaibkhan.com/blog/how-to-use-signals-with-angular-forms/).

## Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
