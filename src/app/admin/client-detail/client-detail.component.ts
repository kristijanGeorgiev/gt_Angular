import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUser } from '../../models/homeservices';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-detail',
  standalone: false,
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
   client: UpdateUser | undefined;
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
      this.userService.getClientById(id).subscribe((client) => {
        this.client = client;
        client.dateOfBirth = client.dateOfBirth.substring(0,10)
      });
    }
  }

  back(): void {
    {
        this.router.navigate(['/admin-dashboard/client-list']);
    };
    }
}
