import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ApolloTestingModule] });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
