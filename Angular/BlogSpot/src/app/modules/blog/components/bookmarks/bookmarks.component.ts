import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { BookmarkService } from 'src/app/core/services/bookmark/bookmark.service';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  currentUser: any;
  bookmarks: any[] = [];
  blogs: any[] = [];
  constructor(
    private userProfileService: UserProfileService,
    private bookmarkService: BookmarkService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.userProfileService.userProfile$
      .pipe(
        switchMap((res) => {
          this.currentUser = res;
          return this.bookmarkService.getBookmarks(this.currentUser.id);
        }),
        switchMap((bookmarks) => {
          this.bookmarks = bookmarks;
          return this.blogService.getAllBlogs();
        })
      )
      .subscribe({
        next: (res: any) => {
          this.blogs = res.filter((blog: any) =>
            this.bookmarks.includes(blog.id)
          );
        },
      });
  }

  removeBookmark(blogId: number) {
    this.bookmarkService
      .toggleBookmark(this.currentUser.id, blogId)
      .subscribe((res) => {
        this.bookmarks = res;
        this.blogs = this.blogs.filter((blog: any) => blog.id != blogId);
      });
  }
}
