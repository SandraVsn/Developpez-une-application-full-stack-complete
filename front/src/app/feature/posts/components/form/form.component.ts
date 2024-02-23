import { Component, inject } from '@angular/core';
import { Topic } from '../../../topics/interfaces/topic.interface';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TopicApiService } from '../../../topics/services/topic-api.service';
import { Router, RouterModule } from '@angular/router';
import { PostApiService } from '../../services/post-api.service';
import { CreatePostDto } from '../../interfaces/createPostDto.interface';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from '../../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Observable, catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
})
export class FormComponent {
    private readonly topicApiService = inject(TopicApiService)
    public readonly fb = inject(FormBuilder)
    private readonly router = inject(Router)
    private readonly postApiService = inject(PostApiService)
    private readonly location = inject(Location)

    public topics$!: Observable<Topic[] | undefined>;
    public postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(3)]],
      topicId: [0, [Validators.required, Validators.maxLength(1)]],
    });
    public onError: boolean = false;

  ngOnInit(): void {
    this.topics$ = this.topicApiService.getAll().pipe(
      catchError(() => {
        this.onError = true;
        return of(undefined);
      })
    );
  }

  public submit() {
    this.postApiService.create(this.postForm.value as CreatePostDto).pipe(
      take(1),
      catchError(() => {
        this.onError = true;
        return of(undefined);
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/posts'])
      },
      error: () => this.onError = true
    })
  }

  public goBack(): void {
    this.location.back();
  }
}
