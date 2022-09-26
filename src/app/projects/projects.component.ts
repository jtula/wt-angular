import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/services/project.service';
import { Project } from '../shared/services/project'; 
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  p: number = 1;
  loading: boolean = false;
  Project!: Project[];
  hideWhenNoProject: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(public projectApi: ProjectService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true
    this.dataState();
    let s = this.projectApi.getProjectList(); 
    s.snapshotChanges().subscribe(data => {
      this.Project = [];
      data.forEach(item => {
        let a: any = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Project.push(a as Project);
      })
      this.loading = false;
    })
  }

  dataState() {     
    this.loading = true
    this.projectApi.getProjectList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoProject = false;
        this.noData = true;
      } else {
        this.hideWhenNoProject = true;
        this.noData = false;
      }
      this.loading = false
    })
  }

  deleteProject(project: Project) {
    if (window.confirm('Are sure you want to delete this project ?')) { 
      this.projectApi.deleteProject(project.$key)
      this.toastr.success(project.name + ' successfully deleted!');
    }
  }

}
