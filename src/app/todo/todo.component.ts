import { TodoService } from './../todo.service';
import { ADD, UPDATE, DELETE } from './../action';
import { TodoItem, IAppState } from './../store';
import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @select() todos;
  constructor(private ngRedux: NgRedux<IAppState>, private service: TodoService) {
  }

  // commments to connect redux and APIs
  ngOnInit() {
    // this.service.loadTodos();
  }

  add(input: HTMLInputElement) {
    if (input.value) {
      this.ngRedux.dispatch({type: ADD, body: input.value});
      /*
      this.ngRedux.dispatch({type: ADD, body: input.value, id: Date.now()});
      const todo = {title: input.value};
      this.service.addTodo(todo).subscribe( t => {
        this.ngRedux.dispatch({type: 'ADD_TODO_CORRELATE', todo: t}); // modify the id of object in store
      });
      */
      input.value = '';
    }
  }

  updateItem(todo: TodoItem) {
    this.ngRedux.dispatch({type: UPDATE, body: todo.id});
  }

  removeItem(todo: TodoItem) {
    this.ngRedux.dispatch({type: DELETE, body: todo.id});
  }

}
