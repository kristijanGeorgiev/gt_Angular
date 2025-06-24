import { Component, OnInit } from '@angular/core';
import { Admin, UpdateUser } from '../../models/homeservices';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-edit',
  standalone: false,
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent implements OnInit{
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

  saveChanges(): void {
    if (this.admin) {
      this.userService.updateClient(this.userId, this.admin).subscribe(() => {
        this.router.navigate(['/admin-dashboard/users/admins']);
      });
    }
  }
  back(): void {
    {
        this.router.navigate(['/admin-dashboard/users/admins']);
    };
    }
}
