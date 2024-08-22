import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import ToDoList from "./ToDoList";
import AddTask from "./AddTask";

class App extends React.Component{
    render(){
        return (
            <section id="todo">
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route path="/:filter?" Component={ToDoList}/>
                        <Route path="/add-task" Component={AddTask}/>

                    </Routes>
                </BrowserRouter>
                
            </section>
        )
    }
}

export default App;