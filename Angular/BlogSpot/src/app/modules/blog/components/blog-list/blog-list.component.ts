import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) {}

  blogs: any[] = [];
  users: any[] = [];
  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (res: any) => {
        this.blogs = res;
      },
    });

    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
    });
  }
}
