import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  currentUser: any;
  addBlogForm: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private blogService: BlogService,
    private userProfileService: UserProfileService,
    private tostr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userProfileService.userProfile$.subscribe((res) => {
      this.currentUser = res;
    });
  }

  addBlog() {
    let date = Date.now();
    const blog = {
      id: date,
      title: this.addBlogForm.value.title,
      content: this.addBlogForm.value.content,
      category: this.addBlogForm.value.category,
      user_id: this.currentUser.id,
      username: this.currentUser.name,
      user_avatar: this.currentUser.avatar,
      image_url: './../../../../../assets/img/laptop.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.blogService.addBlog(blog).subscribe({
      next: (res: any) => {
        console.log(res);
        this.tostr.success('Blog added successfully', 'Success');
        this.router.navigate(['/blog/blog-list']);
      },
    });
  }
}
