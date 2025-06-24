import { Component } from '@angular/core';
import { WorkPosition } from '../../models/homeservices';
import { WorkpositionService } from '../../services/workposition.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-work-position-edit',
  standalone: false,
  templateUrl: './work-position-edit.component.html',
  styleUrl: './work-position-edit.component.css'
})
export class WorkPositionEditComponent {
   position: WorkPosition | undefined;
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workpositionservice: WorkpositionService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    if (id) {
      this.workpositionservice.getById(id).subscribe((position) => {
        this.position= position;
      });
    }
  }

  saveChanges(): void {
    if (this.position) {
      this.workpositionservice.update(this.position).subscribe(() => {
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
