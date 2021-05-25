import {useState,useEffect} from 'react';
import {Button}  from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Todo from './Todo'
import db from './firebase'
import firebase from 'firebase'

const Main= () => {


    // theese are the basic variables 
    const [list,setList] = useState([]);
    const [input,setInput] = useState('');
    const [userId,setUserId] = useState('');
    const[signedIn,setsignedIn]= useState(true);

    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user => {

            if (user) {            
              
              setUserId(firebase.auth().currentUser.uid)              

            
            }
            
            else {
                setsignedIn(false);
              // User is signed out.
                        
            }

            return user;

          })
         
        },[userId,signedIn])



        // this funtion fires up when add button is pressed and it updates the firebase db with current todos
    const addTodo = (e)=>{
        e.preventDefault();
      
        db.collection('users').doc(userId).collection('todos').add({
            todo:input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), // this is firebase timestamp
            checked: false    // this is the todo's initial status: not checked!

        })

       
        setInput('')

    }



    // This function fires when a button pressed inside the input and chanches the input state 

    const onInput =(event)=>{setInput(event.target.value)}
    
    

    // This one creates a list to feed the main component using onSnapshot method witch
    //is triggered every time there is a change in the todos database.
    
    useEffect(()=>{ userId&&

        

        db.collection('users').doc(userId).collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{

            setList(snapshot.docs.map(doc=> ({

                id: doc.id,
                todo: doc.data().todo,
                checked : doc.data().checked

            })))


        })

    },[userId])



    // this function logs out of app and renders again the login page

    const handleLogout=(e)=>{

        firebase.auth().signOut();      
            
          document.location.replace('/')
            


        }
    
    


    


    return (

        <div className="form-container">
            <form>
                <input value ={input} onChange={onInput}  className="todo-input"placeholder = "Type your new task here"/>
                <Button variant="contained" size="small" color="primary"disabled={!input} type="submit" onClick = {addTodo} className="add-btn" startIcon={<AddCircleIcon/>}>Add</Button></form>
            
            
            <ul>                       
                 {list && list.map((todo,index) =>(
                     
                  <Todo userId={userId} text={todo} key={index}></Todo>))
                }
                  

            </ul>
            <div className="logout"><Button onClick={handleLogout}  variant="contained" color="secondary" >Logout</Button>
            </div>            



        </div>

        
      );
}
export default Main ;

