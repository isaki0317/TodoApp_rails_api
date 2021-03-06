import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {/* stateに定義したアロー関数をmapで分割して取り出し、
        map等でレンダリングする際はkeyを定義する*/}
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="list-row">
              <li>{todo.name}</li>
              <button onClick={() => onClickComplete(todo.id)}>完了</button>
              {/* 引数を定義する場合はアロー関数を宣言する */}
              <button onClick={() => onClickDelete(todo.id)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};