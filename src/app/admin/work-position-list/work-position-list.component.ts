import { Component } from '@angular/core';
import { WorkPosition } from '../../models/homeservices';
import { WorkpositionService } from '../../services/workposition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-position-list',
  standalone: false,
  templateUrl: './work-position-list.component.html',
  styleUrl: './work-position-list.component.css'
})
export class WorkPositionListComponent {
   workpositions: WorkPosition[] = [];
    userID: number = Number(localStorage.getItem('userId'));
    error: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
  
    constructor(private workpositionservice: WorkpositionService, private router: Router) {}
  
    ngOnInit(): void {
      this.loadWorkPositions();
    }
  
    loadWorkPositions(): void {
      this.workpositionservice.getAll()
        .subscribe({
          next: (data) => {
            this.workpositions = data;
            this.error = '';
          },
          error: (err) => {
            this.error = 'Failed to load work positions.';
            console.error(err);
          }
        });
    }
    sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.workpositions.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id- b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
    sortByName(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.workpositions.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
    editWorkPosition(id: number): void {
      this.router.navigate(['/admin-dashboard/workPosition-edit', id]);
    }
    addWorkPosition(): void {
      this.router.navigate(['/admin-dashboard/workPosition-add']);
    }
    deleteWorkPosition(workposition: WorkPosition): void {
    if (confirm('Do you want to delete the work position')) {
      this.workpositionservice.delete(workposition.id).subscribe(() => {
        this.loadWorkPositions();
      });
    }
  }
}
