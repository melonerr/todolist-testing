import { useState, useEffect } from "react";
import { Card } from "antd";
import { Button, Input, Checkbox, List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [input, setInput] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (input.trim() === "") return;
        if (editId !== null) {
            setTodos(todos.map(todo => todo.id === editId ? { ...todo, text: input } : todo));
            setEditId(null);
        } else {
            setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
        }
        setInput("");
    };

    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const startEdit = (id: number, text: string) => {
        setInput(text);
        setEditId(id);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ textAlign: "center" }}>Todo List</h2>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <Input value={input} onChange={(e: any) => setInput(e.target.value)} placeholder="Add a new task" />
                <Button type="primary" onClick={addTodo}>{editId !== null ? "Update" : "Add"}</Button>
            </div>
            <Card>
                <List
                    dataSource={todos}
                    renderItem={(todo: any) => (
                        <List.Item
                            actions={[
                                <Button type="text" icon={<EditOutlined />} onClick={() => startEdit(todo.id, todo.text)} />,
                                <Button type="text" icon={<DeleteOutlined />} onClick={() => deleteTodo(todo.id)} />
                            ]}
                        >
                            <Checkbox checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
                            <span style={{ marginLeft: "8px" }}>{todo.text}</span>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
}
