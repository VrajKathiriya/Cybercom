import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogs = [
    {
      blogId: 1,
      title: 'The Art of Angular Development',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel leo nec tortor aliquet blandit vel...',
      authorID: 101,
      publicationDate: '2024-05-01T08:00:00',
      lastModifiedDate: '2024-05-01T08:00:00',
    },
    {
      blogId: 2,
      title: 'Introduction to Machine Learning',
      content:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...',
      authorID: 102,
      publicationDate: '2024-05-02T10:30:00',
      lastModifiedDate: '2024-05-02T10:30:00',
    },
    {
      blogId: 3,
      title: 'The Power of Positive Thinking',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...',
      authorID: 103,
      publicationDate: '2024-05-03T12:45:00',
      lastModifiedDate: '2024-05-03T12:45:00',
    },
    {
      blogId: 4,
      title: 'Exploring the Wonders of Space',
      content:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur...',
      authorID: 104,
      publicationDate: '2024-05-04T15:00:00',
      lastModifiedDate: '2024-05-04T15:00:00',
    },
    {
      blogId: 5,
      title: 'Mastering Data Structures and Algos',
      content:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum...',
      authorID: 105,
      publicationDate: '2024-05-05T17:20:00',
      lastModifiedDate: '2024-05-05T17:20:00',
    },
  ];

  constructor() {}

  getAllBlogs(): Observable<any> {
    let blogs: any = localStorage.getItem('blogs');
    blogs = JSON.parse(blogs) || [];
    return of(blogs);
  }

  addBlog(blog: any) {
    let blogs: any = localStorage.getItem('blogs');
    blogs = JSON.parse(blogs) || [];
    blogs = [...blogs, blog];

    localStorage.setItem('blogs', JSON.stringify(blogs));

    return of(blog);
  }

  editBlog(blogId: number, updatedBlog: any) {
    let blogs: any = localStorage.getItem('blogs');
    blogs = JSON.parse(blogs) || [];

    blogs = blogs.map((blog: any) => {
      if (blog.id == blogId) {
        return updatedBlog;
      } else return blog;
    });

    console.log('edit blog called');

    localStorage.setItem('blogs', JSON.stringify(blogs));
  }

  deleteBlog(blogId: number): Observable<any> {
    let blogs: any = localStorage.getItem('blogs');
    blogs = JSON.parse(blogs) || [];

    blogs = blogs.filter((blog: any) => blog.id != blogId);

    localStorage.setItem('blogs', JSON.stringify(blogs));

    return of(true);
  }
}
