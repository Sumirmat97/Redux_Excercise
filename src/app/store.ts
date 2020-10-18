import { tassign } from 'tassign';
import { ADD, DELETE_ALL, UPDATE, DELETE } from './action';

export interface TodoItem {
    id: number;
    issuppressed: boolean;
    text: string;
}

export interface IAppState {
    todos: TodoItem[];
    lastUpdateDate: Date;
}

export const INITIAL_STATE: IAppState = {
    todos: [],
    lastUpdateDate: null
};

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD:
            const newId = state.todos.length > 0 ? state.todos[state.todos.length - 1].id + 1 : 0;
            const s: TodoItem = {id: newId, issuppressed: false, text: action.body};
            return tassign(state, {todos: state.todos.concat(s), lastUpdateDate: new Date()});
        case UPDATE:
            const item = state.todos.find(t => t.id === action.body);
            const index = state.todos.indexOf(item);
            item.id = 1;
            if (index !== -1) {
                const beforeItems = state.todos.slice(0, index);
                const afterItems = state.todos.slice(index + 1);
                const updatedItem = tassign(item, {issuppressed: !item.issuppressed});
                return tassign(state, {todos: [...beforeItems, updatedItem, ...afterItems], lastUpdateDate: new Date()});
            }
            return state;
        case DELETE:
            return tassign(state, {todos: state.todos.filter(t => t.id !== action.body), lastUpdateDate: new Date()});
        case DELETE_ALL:
            if (state.todos.length > 0) {
                return tassign(state, {todos: [], lastUpdateDate: new Date()});
            }
            return state;
    }
    return state;
}
