import React, { useEffect, useState } from 'react'
import '../css/Todo.css'
function Todo() {
    let [todoitemlist, updatetodoitemlist] = useState([])
    let [recentdoneitems, updaterecentdoneitems] = useState([])
    let [todoitemdetail, updatetodoitemdetail] = useState({
        title: "",
        description: "",
    })
    let latestdata
    function inputhandaler(event) {
        updatetodoitemdetail((prevalue) => {
            return ({
                ...prevalue,
                [event.target.name]: event.target.value
            })
        })
    }


    async function saveTheDetails(event) {
        event.preventDefault()
        // updatetodoitemdetail((prevalue) => {
        //     return ({
        //         ...prevalue,
        //         time:Date()
        //     })
        // })
        // todoitemlist.push(todoitemdetail)
        // updatetodoitemlist((prevalue)=>{
        //     return({
        //         ...prevalue,
        //         todoitemdetail
        //     })
        // })
        // console.log(todoitemdetail);
        let data = { ...todoitemdetail, time: new Date().toString().slice(0, 25) }
        // console.log(data);
        latestdata=[...todoitemlist,data]
        updatetodoitemlist((prevalue) => {
            return ([...prevalue, data])
        })


        updatetodoitemdetail({
            title: "",
            description: ""
        })
        let storagedata = JSON.stringify({ data: latestdata })
        localStorage.setItem('tododata', storagedata)


    
    }
    async function gettododata() {
        try {
            let tododata = localStorage.getItem('tododata')
            // console.log(tododata);
            let data = JSON.parse(tododata)
            // console.log(data);
            if (tododata !== null) {
                updatetodoitemlist(data.data)
            }
            let recentdata = localStorage.getItem('recentdata')
            // console.log(recentdata);
            let recentdatalist = JSON.parse(recentdata)
            // console.log(data);
            if (recentdata !== null) {
                updaterecentdoneitems(recentdatalist.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    function DeleteItem(object) {
        // console.log(object);
        let data = todoitemlist.splice(object, 1)
        updatetodoitemlist([...todoitemlist])
        latestdata=[...todoitemlist]
        let storagedata = JSON.stringify({ data: latestdata })
        localStorage.setItem('tododata', storagedata)
    }
    function Editdata(data,index) {
        // console.log(data);
        updatetodoitemdetail({
            title:data.title,
            description:data.description
        })
        // console.log(index);
        DeleteItem(index)
    }

    function MarkasDone(object) {
        // console.log(object);
        let data = todoitemlist.splice(object, 1)
        // console.log(data[0]);
        updatetodoitemlist([...todoitemlist])
        latestdata=[...todoitemlist]
        let storagedata = JSON.stringify({ data: latestdata })
        localStorage.setItem('tododata', storagedata)
        updaterecentdoneitems((prevalue)=>{
            return([...prevalue,data[0]])
        })
        latestdata=[...recentdoneitems,data[0]]
        let secondstoragedata = JSON.stringify({ data: latestdata })
        localStorage.setItem('recentdata', secondstoragedata)
    }




    useEffect(() => {
        gettododata()
    }, [])
    return (
        <>
            <div className="inputworkcontainer">
                <form onSubmit={saveTheDetails}>
                    <input value={todoitemdetail.title} onChange={inputhandaler} type="text" name="title" id="title" placeholder="Enter Title" />
                    <textarea value={todoitemdetail.description} onChange={inputhandaler} name="description" id="description" placeholder="Enter Description" required />
                    <div className="buttoncontainer">
                        <button><i className="fas fa-plus"></i></button>
                    </div>
                </form>
            </div>
            <hr style={{ 'height': '2px', 'background': 'black' }} />
            <div className="listofitems">
                <h1>Things to do</h1>
                <div className="todolistcontainer">
                    {
                        todoitemlist.length > 0 ? (<>
                            {todoitemlist.map((value, index) => {
                                return (
                                    <Itemcontainer key={index} index={index} value={value} delete={DeleteItem} edit={Editdata} done={MarkasDone}/>
                                )
                            })}
                        </>) : (<>
                            <h1>📧To Do List is Empty📧</h1>
                        </>)
                    }
                </div>
            </div>
        </>
    )
}

function Itemcontainer(object) {
    function deleteItem() {
        object.delete(object.index)
    }
    function markasDone() {
        object.done(object.index)
    }
    function editItem() {
        object.edit(object.value,object.index)
    }
    return (
        <>
            <div className="listitem">
                <h2>{object.value.title}</h2>
                <p>{object.value.description}</p>
                <h4>Time of Creation : {object.value.time}</h4>
                <div className="editcontainer">
                    <button onClick={editItem}><i className="fas fa-edit"></i></button>
                    <button onClick={deleteItem}><i className="fas fa-trash"></i></button>
                    <button onClick={markasDone}><i className="fas fa-clipboard-check"></i></button>
                </div>
            </div>
        </>
    )
}






export default Todo
