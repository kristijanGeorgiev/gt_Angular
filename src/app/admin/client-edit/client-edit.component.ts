import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUser } from '../../models/homeservices';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-edit',
  standalone: false,
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent implements OnInit{
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

  saveChanges(): void {
    if (this.client) {
      this.userService.updateClient(this.userId, this.client).subscribe(() => {
        this.router.navigate(['/admin-dashboard/users/clients']);
      });
    }
  }
}
