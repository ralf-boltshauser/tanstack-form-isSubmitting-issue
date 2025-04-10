# Tanstack Form

## Issue
There appears to be an issue with the form's isSubmitting state not working correctly on the submit button in the ClientComp component. This is evident when comparing two similar form implementations:

1. ClientComp - Uses synchronous onBlur validation
2. ClientCompAsyncBlurValidator - Uses asynchronous onBlurAsync validation

The only difference between these components is the validation approach:
- ClientComp uses synchronous validation with hardcoded data
- ClientCompAsyncBlurValidator fetches data asynchronously

The isSubmitting state works as expected in ClientCompAsyncBlurValidator but not in ClientComp.

## Structure
- hooks/
  - form-context.tsx
  - form.tsx
- components/form/
  - text-field.tsx
  - ...
- features/book/forms/
  - create/
    - create-book-form.tsx
    - book-form-options.tsx