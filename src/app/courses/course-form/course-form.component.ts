import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar){
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('onSubmit');
    this.service.save(this.form.value)
      .subscribe({
        next: data => console.log(data),
        error: error => this.onError()
      });
  }

  onCancel(){
    console.log('onCancel');
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso','',{duration:5000});
  }

}



