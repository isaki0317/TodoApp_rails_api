import React, { useReducer, useState, useEffect } from "react";
import axios from 'axios';
import "./styles.css";
import { InputTodos } from "./components/inputTodos";
import { IncompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos, completeTodos } from "./components/completeTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  //stateに定義して利便性を上げる
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //inputに入力された値をsetTodoTextにセット
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    axios.post('/issues',
    { name: todoText }
    ).then(response => {
      console.log("registration response", response.data)
      const newTodos = [...incompleteTodos, response.data];
      setIncompleteTodos(newTodos);
    })
    setTodoText("");
  };

  //削除ボタンが押された時の実行処理
  const onClickDelete = (todo_id) => {
    axios.delete(`/issues/${todo_id}`)
    // setIncompleteTodos(newTodos);
    .then(response => {
      //todo_idと一致するtodoのみreturnしない
      setIncompleteTodos(incompleteTodos.filter(x => x.id !== todo_id))
      console.log("set")
    }).catch(data =>  {
      console.log(data)
    })
  };

  //完了ボタンが押された時の実行処理
  const onClickComplete = (index) => {
    //未完了リストから削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    //完成リストに値を追加して変数に格納
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    //それぞれをset関数を呼んで更新
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻すボタンが押された時の実行処理
  const onClickBack = (index) => {
    //完了リストから削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    //未完了リストに値を追加して変数に格納
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    //set関数を呼んで更新
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  useEffect(() => {
    axios.get('/issues')
    .then((results) => {
      console.log(results.data)
      setIncompleteTodos(results.data);
    })
    .catch((data) =>{
      console.log(data)
    })
  }, []);

  return (
    <div className="body">
      {/* コンポーネント化して、propsを渡す */}
      <InputTodos
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        //5を超えた時点でtrueが渡る
        disabled={incompleteTodos.length >= 10}
      />
      {/* Todoが５個以上の場合だけ右辺が実行 */}
      {incompleteTodos.length >= 10 && (
        <p style={{ color: "red", textAlign: "center" }}>
          登録できるtodo5個までだよ～。消化しよう!
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </div>
  );
};
