import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor() {}

  toggleLike(blogId: number, userId: number) {
    let blogs: any = localStorage.getItem('blogs');
    blogs = JSON.parse(blogs) || [];

    blogs.forEach((blog: any) => {
      if (blog.id == blogId) {
        if (!blog.likes.includes(userId)) blog.likes.push(userId);
        else blog.likes = blog.likes.filter((like: any) => like != userId);
      }
    });
    localStorage.setItem('blogs', JSON.stringify(blogs));
    return of(blogs);
  }
}
