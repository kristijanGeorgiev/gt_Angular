import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkpositionService } from '../../services/workposition.service';

@Component({
  selector: 'app-work-position-add',
  standalone: false,
  templateUrl: './work-position-add.component.html',
  styleUrl: './work-position-add.component.css'
})
export class WorkPositionAddComponent {
   position = {
    id: 0,
    name: ''
  };

  error = '';

  constructor(private router: Router, private workpositionservice: WorkpositionService) {}

  addWorkPosition(): void {
    if (this.position) {
      this.workpositionservice.add(this.position).subscribe(() => {
        this.router.navigate(['/admin-dashboard/workPosition']);
      });
    }
  }
  back(): void {
    {
        this.router.navigate(['/admin-dashboard/workPosition']);
    };
    }
}
