import React, { useState } from 'react'
import Header from './Components/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Todo from './Components/Todo'
import RecemtlyDone from './Components/RecemtlyDone'
function App() {
    let [togglepages, updatetogglepages] = useState(0)
    function togglepage(object) {
        updatetogglepages(object)
    }
    return (
        <>
            <Header changepage={togglepage} />
            {
                togglepages === 0 ? (
                    <Todo />
                ) : (
                    <RecemtlyDone />
                )
            }
        </>
    )
}

export default App
