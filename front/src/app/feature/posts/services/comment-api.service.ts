import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { CreatePostDto } from '../interfaces/createPostDto.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

  private url = 'http://localhost:9000/api/comment';

  constructor(private httpClient: HttpClient) {
  }

  public getAllByPostId(postId: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.url}/post/${postId}`);
  }

  public getOne(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`${this.url}/${id}`);
  }

  public create(post: CreatePostDto): Observable<Post> {
    return this.httpClient.post<Post>(this.url, post);
  }
}
