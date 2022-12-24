import React, { useEffect, useState } from 'react'

function RecemtlyDone() {
    let [recentdoneitems, updaterecentdoneitems] = useState([])
    async function getrecentdonedata() {
        try {
            let recentdata = localStorage.getItem('recentdata')
            // console.log(recentdata);
            if (recentdata !== null) {
                let data = JSON.parse(recentdata)
                // console.log(data.data);
                updaterecentdoneitems(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    function MarkasNotDone(value, object) {
        // console.log(object);
        // console.log(value);
        let data = recentdoneitems.splice(object, 1)
        let latestdata = [...recentdoneitems]
        updaterecentdoneitems([...recentdoneitems])
        let secondstoragedata = JSON.stringify({ data: latestdata })
        localStorage.setItem('recentdata', secondstoragedata)

        let tododata = localStorage.getItem('tododata')
        // console.log(tododata);
        let notedata = JSON.parse(tododata)
        if (tododata !== null) {
            latestdata = notedata.data
            latestdata = [...latestdata, value]
            let storagedata = JSON.stringify({ data: latestdata })
            localStorage.setItem('tododata', storagedata)
        } else {

        }


    }
    function DeleteItem(object) {
        // console.log(object);
        let data = recentdoneitems.splice(object, 1)
        updaterecentdoneitems([...recentdoneitems])
        let latestdata = [...recentdoneitems]
        let storagedata = JSON.stringify({ data: latestdata })
        localStorage.setItem('recentdata', storagedata)
    }
    useEffect(()=>{
        getrecentdonedata()
    },[])
    return (
        <>
            <div className="listofitems">
                <h1>Things Which Are Done</h1>
                <div className="todolistcontainer">
                    {
                        recentdoneitems.length > 0 ? (<>
                            {recentdoneitems.map((value, index) => {
                                return (
                                    <Itemcontainer key={index} index={index} value={value} delete={DeleteItem} notdone={MarkasNotDone} />
                                )
                            })}
                        </>) : (<>
                            <h1>📧Recent Task List is Empty📧</h1>
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
    function markasNotDone() {
        object.notdone(object.value, object.index)
    }
    return (
        <>
            <div className="listitem">
                <h2>{object.value.title}</h2>
                <p>{object.value.description}</p>
                <h4>Time of Creation : {object.value.time}</h4>
                <div className="editcontainer">
                    <button onClick={deleteItem}><i className="fas fa-trash"></i></button>
                    <button onClick={markasNotDone}><i className="fas fa-undo"></i></button>
                </div>
            </div>
        </>
    )
}

export default RecemtlyDone
