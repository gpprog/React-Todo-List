import {Button}  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import db from './firebase';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import React from 'react'




const Todo = ({text,userId}) => {

    // this is a reference to the specific firebase document for each todo
    let docRef= db.collection('users').doc(userId).collection('todos').doc(text.id);


    const [input,setInput]=useState('')

    const [checked, setChecked] = useState(false) // this is the status for any todo item
    
    
    // read the initial checked status from db and apply it!
    docRef.get().then((doc)=> {
  
    setChecked(doc.data().checked) 

});
    
      

    // this function fires up when a ckeckbox is clicked and updates the db as well!
    const handleChange = (event) => {
          setChecked(event.target.checked);
          db.collection('users').doc(userId).collection('todos').doc(text.id).set({checked: event.target.checked}, {merge:true})
          

        };
      
   


    // this is a modal styling copied from material ui site
    function getModalStyle() {
        const top = 50 ;
        const left = 50;
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    

    const useStyles = makeStyles(theme => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            position: 'absolute',
            width: 450,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 3, 3),
        },
    }));
    

    //this function fires up when updating a todo item inside the modal and result is to 
    //update the firebase db

    const updateTodo =()=>{

        db.collection('users').doc(userId).collection('todos').doc(text.id).set({todo: input}, {merge: true})
        setOpen(false)

    }


// this is used by material ui for styling 
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
        
    
    // this is the modal's state 
    const[open,setOpen]= useState(false);


    // this function deletes the current entry from the firebase db
    const handleDel = ()=>{
        
        db.collection('users').doc(userId).collection('todos').doc(text.id).delete()
    }

    const handleModal =()=>{
        setOpen(true)

       
    }


    




    return ( 
        
        


        <>  
            <Modal open={open} onClose={e => setOpen(false)}>
                 
                <div style={modalStyle} className={classes.paper}>
                    <form>                    <h2>Edit your todo</h2>
                    <input onChange={(e)=>  setInput(e.target.value)} placeholder={text.todo}></input>
                    <Button type="submit" disabled={!input.trim()} variant="contained" color="primary" onClick={
                        e=>{
                            updateTodo()
                            setOpen(false)
                            setInput('')
                        }}>OK</Button>

                    </form>    
                </div>
            </Modal>


            <li className={`checked-${checked}`}> 
                {text.todo} <span ><Checkbox checked={checked}   onChange={handleChange}  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}/>
                <EditIcon id="edit"onClick={handleModal}/>
                <DeleteIcon id="delete" onClick={handleDel}/></span>
            </li>

        </>

    );
    
}
 
export default Todo;