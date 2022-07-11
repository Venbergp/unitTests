import {ComponentFixture, flush, TestBed, tick} from '@angular/core/testing';

import { FormComponent } from './form.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule, By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {AppModule} from "../app.module";

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [],
      imports: [
        AppModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should insert 123 in login', () => {
    component.Form.controls['login'].setValue('123')
    expect(component.Form.controls['login'].value).toBe('123')
  })

  it('should block send button', function () {


    component.Form.controls['login'].setValue('123')
    component.Form.controls['password'].setValue('12345')

    //console.log(fixture.debugElement.queryAll(By.css('input'))[0].nativeElement)
    //console.log(fixture.debugElement.queryAll(By.css('input'))[1].nativeElement)
    fixture.detectChanges()

    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy()

    component.Form.controls['password'].setValue('123456')

    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeFalsy()
  });

  it('should check errors in inputs', function () {

    fixture.debugElement.queryAll(By.css('input'))[0].triggerEventHandler('blur')
    fixture.debugElement.queryAll(By.css('input'))[1].triggerEventHandler('blur')
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('mat-error')).length).toEqual(2)
  });

  it('should check len of password', function () {
    component.Form.controls['login'].setValue('123')
    component.Form.controls['password'].setValue('12345')
    fixture.debugElement.queryAll(By.css('input'))[0].triggerEventHandler('blur')
    fixture.debugElement.queryAll(By.css('input'))[1].triggerEventHandler('blur')
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.innerText).toBe('Минимальная длина пароля - 6 символов. Введите корректный пароль')
  });
});
