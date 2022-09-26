import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  
  public projectForm!: FormGroup;

  constructor(
    public projectApi: ProjectService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.projectApi.getProjectList();
    this.prjForm();
  }

  prjForm() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get name() {
    return this.projectForm.get('name');
  }

  resetForm() {
    this.projectForm.reset();
  }

  submitProjectData() {
    this.projectApi.addProject(this.projectForm.value);
    this.toastr.success(
      this.projectForm.controls['name'].value + ' successfully added!'
    );
    this.resetForm();
  }
}