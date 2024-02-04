import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { CreatePostDto } from '../interfaces/createPostDto.interface';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  private posts: Post[] = [
    {
    id: 1,
    updatedAt: new Date(),
    title: "test",
    content: "test",
    userName: "test", 
    topicName: "test" 
    },
    {
      id: 2,
      updatedAt: new Date(),
      title: "test2",
      content: "test2",
      userName: "test2", 
      topicName: "test2" 
    }, 
    {
    id: 3,
    updatedAt: new Date(),
    title: "test3",
    content: "test3",
    userName: "test3", 
    topicName: "test3" 
    }
  ]

  private url = 'http://localhost:9000/api/post';

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<Post[]> {
    return of(this.posts)
    return this.httpClient.get<Post[]>(this.url);
  }

  public getOne(id: string): Observable<Post> {
    return of(this.posts.find(post => post.id === +id) || this.posts[0])
    return this.httpClient.get<Post>(`${this.url}/${id}`);
  }

  public create(post: CreatePostDto): Observable<Post> {
    const posted: Post = {...post, id: 4, title: "test4", content: "test4", updatedAt: new Date(), userName: "test", topicName: 'test'}
    return of(posted)
    return this.httpClient.post<Post>(this.url, post);
  }
}
