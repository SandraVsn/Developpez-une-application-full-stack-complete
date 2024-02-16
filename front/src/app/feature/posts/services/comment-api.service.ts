import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommentDto } from '../interfaces/createCommentDto.interface';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

  private url = 'http://localhost:9000/api/comment';

  constructor(private httpClient: HttpClient) {
  }

  public getAllByPostId(postId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.url}/post/${postId}`);
  }

  public create(comment: CreateCommentDto): Observable<Comment[]> {
    return this.httpClient.post<Comment[]>(this.url, comment);
  }
}
