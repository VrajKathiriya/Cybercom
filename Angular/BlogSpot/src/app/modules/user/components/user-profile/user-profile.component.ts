import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  blogs: any[] = [];
  users: any[] = [];
  constructor(
    private userProfileService: UserProfileService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.userProfileService.userProfile$
      .pipe(
        switchMap((res: any) => {
          this.currentUser = res;
          console.log(res);
          return this.blogService.getAllBlogs();
        })
      )
      .subscribe({
        next: (res: any) => {
          this.blogs = res.filter(
            (blog: any) => blog.user_id == this.currentUser.id
          );
        },
      });
  }

  deleteBlog(blogId: number) {
    let confirmed = confirm('Are you sure?');
    if (!confirmed) return;
    console.log('hi');
    this.blogService.deleteBlog(blogId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.blogs = this.blogs.filter((blog) => blog.id != blogId);
      },
    });
  }
}
