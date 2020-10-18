import { IAppState } from './../store';
import { DELETE_ALL } from './../action';
import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @select((s: IAppState) => s.todos.length) count;
  @select() lastUpdateDate;

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  deleteAll() {
    this.ngRedux.dispatch({type: DELETE_ALL});
  }
}
