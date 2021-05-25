import {Button, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';



const Login = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            color:'#251029'
          },
        },
      }));
      
      
    const classes = useStyles();

    const[mail,setMail]=useState('');
    const[pass,setPass]=useState('');
    const[mailHelp,setMailHelp]=useState('');
    const[mailError,setMailError]=useState(false);
    const[passHelp,setPassHelp]=useState('');
    const[passError,setPassError]=useState(false);


    const handleMail=(e)=>{

        setMail(e.target.value);


    }

    const handlePass=(e)=>{

        setPass(e.target.value)
    }



    const handleSignUp=(e)=>{
        e.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(mail,pass).then((userCred)=>{
            document.location.replace('/')



        }).catch((error)=>{
            var errorCode=error.code;
            var errorMessage = error.message;
            console.log(errorCode);

            if(errorCode === "auth/email-already-in-use"){

                setMailError(true);
                setMailHelp(errorMessage)
                setTimeout(()=>{
                    setMailError(false)
                    setMailHelp('')
                },3500)          

            }

            else if (errorCode === "auth/invalid-email"){

                setMailError(true);
                setMailHelp(errorMessage)
                setTimeout(()=>{
                    setMailError(false)
                    setMailHelp('')
                },3500)
            }

            else if (errorCode === "auth/weak-password"){

                setPassError(true);
                setPassHelp(errorMessage)
                setTimeout(()=>{
                    setPassError(false)
                    setPassHelp('')
                },3500)


            }


           else{
               alert(errorCode)
           }


        
        });
       


    }



    

    return (
        <div className="login-container">
            <h2>Sign-up Page</h2>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField error={mailError}   helperText={mailHelp} onChange={handleMail}  placeholder="email" type="email" inputProps={{ 'aria-label': 'description' }}></TextField>
                <TextField error={passError} helperText={passHelp} onChange={handlePass}  placeholder="password" type="password" inputProps={{ 'aria-label': 'description' }}></TextField>
                <Button onClick={handleSignUp} variant="contained" color="primary" >Sign Up</Button>
                <div id="alternative">
                    <Typography variant="h6" >Already a member?</Typography>
                    <span><Link to="/"> Get in!</Link></span>

                </div>
                


            </form>




        </div>



      );
}
 
export default Login;