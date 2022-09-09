import './App.scss';
import TodoItem from './components/TodoItems';
import Header from './components/Header';
import { useState, useEffect, useRef } from 'react';
import Footer from './components/footer';
function App() {
  const [tasks, setTask] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [value, setInputValue] = useState('');
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(tasks);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [tasks]);
  return (
    <div className="container">
      <div className="container__inner">
        <Header />
        <div className="buttons">
          <input
            className="input"
            placeholder="добавьте задание"
            value={value}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}></input>
          <button
            className="inputPlus"
            onClick={() => {
              value ? setTask([{ id: value, title: value }, ...tasks]) : alert('введите задание');
              setInputValue('');
            }}>
            добавить задание
          </button>
          <button
            className="deleteAll"
            onClick={() => {
              setTask([]);
            }}>
            удалить все
          </button>
        </div>
        <div>
          {tasks.map((task, id) => (
            <TodoItem
              key={id}
              id={task.id}
              title={task.title}
              deletePost={() => {
                setTask(tasks.filter((obj) => obj.id !== task.id));
              }}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
