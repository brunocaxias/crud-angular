import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){
      //this.form
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course']
    this.form.setValue(course);
  }

  onSubmit() {
    console.log('onSubmit');
    this.service.save(this.form.value)
      .subscribe({
        next: data => this.onSucces(),
        error: error => this.onError()
      });
  }

  onCancel(){
    this.location.back();
  }

  private onSucces(){
    this.snackBar.open('Sucesso ao salvar curso','',{duration:5000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso','',{duration:5000});
  }

}



