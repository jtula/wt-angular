import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../shared/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  editForm!: FormGroup;

  constructor(private projectApi: ProjectService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.updateProjectData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.projectApi
      .getProject(id!)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }

  get name() {
    return this.editForm.get('name');
  }

  updateProjectData() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  goBack() {
    this.location.back();
  }

  updateForm() {
    this.projectApi.updateProject(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['name'].value + ' updated successfully'
    );
    this.router.navigate(['projects']);
  }

}
