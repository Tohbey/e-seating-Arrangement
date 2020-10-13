import { FormGroup } from '@angular/forms';

export function MustMatch(controlName,matchingControlName){
  return (formGroup:FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName]

    if(matchingControl.errors && !matchingControl.errors.mustMatch){
      return;
    }
    if(control.value !== matchingControl.value){
      matchingControl.setErrors({mustMatch:true})
    }else{
      matchingControl.setErrors(null);
    }
  }
}
