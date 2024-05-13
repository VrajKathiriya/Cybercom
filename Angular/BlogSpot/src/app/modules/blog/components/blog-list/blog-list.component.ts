import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, switchMap } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { BookmarkService } from 'src/app/core/services/bookmark/bookmark.service';
import { LikeService } from 'src/app/core/services/like/like.service';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private bookmarkService: BookmarkService,
    private userProfileService: UserProfileService,
    private likeService: LikeService,
    private tostr: ToastrService
  ) {}

  blogs: any[] = [];
  filterdBlogs: any[] = [];
  users: any[] = [];
  bookmarks: any[] = [];
  currentUser: any;
  ngOnInit(): void {
    console.log('ngonint bloglist');
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
    });

    this.userProfileService.userProfile$
      .pipe(
        switchMap((res) => {
          this.currentUser = res;
          return this.bookmarkService.getBookmarks(this.currentUser.id);
        }),
        switchMap((bookmarks) => {
          this.bookmarks = bookmarks;
          console.log(this.bookmarks);
          return this.blogService.getAllBlogs();
        })
      )
      .subscribe({
        next: (res: any) => {
          this.blogs = res;
          this.filterdBlogs = this.blogs;
        },
      });
  }

  addToBookmarks(blogId: number) {
    this.bookmarkService
      .toggleBookmark(this.currentUser.id, blogId)
      .subscribe((res) => {
        this.bookmarks = res;
      });
  }

  filterBlogs(category: string) {
    if (category == 'all_blogs') {
      this.filterdBlogs = this.blogs;
    } else {
      this.filterdBlogs = this.blogs.filter(
        (blog: any) => blog.category == category
      );
    }
  }

  addLike(blogId: number) {
    this.blogs.forEach((blog: any) => {
      if (blog.id == blogId) {
        this.likeService
          .toggleLike(blogId, this.currentUser.id)
          .subscribe((res) => {
            this.blogs = res;
            this.filterdBlogs = res;
          });
      }
    });
  }
}
