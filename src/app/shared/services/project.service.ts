import { Injectable } from '@angular/core';
import { Project } from './project';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectsRef!: AngularFireList<any>;
  projectRef!: AngularFireObject<any>;
  
  constructor(private db: AngularFireDatabase) {}
  
  addProject(project: Project) {
    this.projectsRef.push({
      name: project.name,
    });
  }

  getProject(id: string) {
    this.projectRef = this.db.object('projects-list/' + id);
    return this.projectRef;
  }
  
  getProjectList() {
    this.projectsRef = this.db.list('projects-list');
    return this.projectsRef;
  }
  
  updateProject(project: Project) {
    this.projectRef.update({
      name: project.name,
    });
  }
  
  deleteProject(id: string) {
    this.projectRef = this.db.object('projects-list/' + id);
    this.projectRef.remove();
  }
}