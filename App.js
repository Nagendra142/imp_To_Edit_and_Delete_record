import React,{useState} from 'react';

export const App=()=>{

    const [single,setsingle]=useState([]);
    const [message,setmessage]=useState({
        textM:"",
        id:""
    });

    const [editable,setedit]=useState(false);


    const ChangeText=(e)=>{
        setmessage({
            ...message,
            textM:e.target.value
    })
        
    }


    const Submitbytton=(e)=>{
        e.preventDefault();
        const Obj={
            textM:message.textM,
            id:new Date().getTime().toString()
        };
        //to add list
         setsingle([...single,Obj]);
         //to set the input field empty
         setmessage({
            textM:"",
            id:""
         })
    };

    //to delete record
    function DeleteFun(e){
        const filter_data=single.filter(child=>{
            return e!==child.id;
        })
        setsingle(filter_data);
    }

    //To edit 
    function Edit_Able(e){
        setedit(true);
        let one=single.find(child=>{
            return child.id===e;
        })
        setmessage({
            textM:one.textM,
            id:one.id
        })
    }
    return <>
    <form>
        <input type="text" placeholder="Type text" id="text" value={message.textM} onChange={ChangeText}/>
        <button onClick={Submitbytton}>{editable?"Edit":"Add"}</button>
    </form>
    {
        (single.length===0 && <h3>No data found</h3>)
    }
    {
    
        single.map(child=>{
            return (
                <li key={child.id}>
                <span>{child.textM}</span>
                <button onClick={()=>Edit_Able(child.id)}>Edit</button>
                <button onClick={()=>DeleteFun(child.id)}>Delete</button>
                </li> 
            )
        })
    }
    </>
}