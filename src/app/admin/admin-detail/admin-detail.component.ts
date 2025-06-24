import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UpdateUser } from '../../models/homeservices';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-detail',
  standalone: false,
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.css'
})
export class AdminDetailComponent {
   admin: UpdateUser | undefined;
  userId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = id;
    if (id) {
      this.userService.getAdminById(id).subscribe((admin) => {
        this.admin = admin;
        admin.dateOfBirth = admin.dateOfBirth.substring(0,10)
      });
    }
  }

  back(): void {
    {
        this.router.navigate(['/admin-dashboard/users/admins']);
    };
    }
  }