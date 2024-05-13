import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  constructor() {}

  getBookmarks(userId: number) {
    let bookmarks: any = localStorage.getItem('bookmarks');
    bookmarks = JSON.parse(bookmarks) || [];

    return of(
      bookmarks
        .filter((bookmark: any) => bookmark.user_id == userId)
        .map((bookmark: any) => bookmark.blog_id)
    );
  }

  toggleBookmark(userId: number, blogId: number) {
    let isAvailable = false;
    let bookmarks: any = localStorage.getItem('bookmarks');
    bookmarks = JSON.parse(bookmarks) || [];

    let newBookmark = {
      id: Date.now(),
      user_id: userId,
      blog_id: blogId,
    };

    bookmarks.forEach((bookmark: any) => {
      if (bookmark.user_id == userId && bookmark.blog_id == blogId) {
        isAvailable = true;
      }
    });

    if (!isAvailable) {
      bookmarks = [...bookmarks, newBookmark];
    } else {
      bookmarks = bookmarks.filter((bookmark: any) => {
        if (bookmark.user_id == userId) {
          return bookmark.blog_id != blogId;
        }
        return true;
      });
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    return of(
      bookmarks
        .filter((bookmark: any) => bookmark.user_id == userId)
        .map((bookmark: any) => bookmark.blog_id)
    );
  }
}
