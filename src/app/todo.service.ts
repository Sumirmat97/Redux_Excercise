import { IAppState } from './store';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly url = 'https://jsonplaceholder.typicode.com/todos/';
  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  loadTodos() {
    this.ngRedux.dispatch({type: 'FETCH_TODOS_REQUEST'}); // for loading icon

    this.http.get(this.url, {responseType: 'json'})
    .subscribe( todos => {
      this.ngRedux.dispatch({type: 'FETCH_TODOS_SUCCESS', todos});
      }, error => {
      this.ngRedux.dispatch({type: 'FETCH_TODOS_ERROR'});
    });
  }

  addTodo(todo) {
    return this.http.post(this.url, JSON.stringify(todo), {responseType: 'json'});
  }
}
