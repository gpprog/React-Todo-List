import {Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {auth} from './firebase';
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

    const[mail,setMail]=useState('')
    const[pass,setPass]=useState('')
    const[mailError,setMailError]=useState(false);
    const[mailHelp,setMailHelp]= useState('')
    const[passError,setPassError] = useState(false)
    const[passHelp,setPassHelp] = useState('')
    

    

    const inputMail= (e)=>{

       var  mailIn =(e.target.value);
       setMail(mailIn);

    }

    const inputPass =(e)=>{
        var passIn = e.target.value;
        setPass(passIn)
    }


    const handleLogin=(e)=>{
        e.preventDefault();


        if (mail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)){

          auth.signInWithEmailAndPassword(mail,pass).then((cred)=>{
       
            document.location.replace("/main")




       
        }).catch((err)=>{
          

          console.log(err.message)
          setPassHelp(err.message)
          setPassError(true)

          setTimeout(()=>{

            setPassHelp('')
            setPassError(false)
          

          },4000);


        })
      
      
      }


        else {



            setMailError(true)
            setMailHelp('Not a valid email format!')


            setTimeout(()=>{
              setMailError(false)
              setMailHelp('')

            },5000)

                  

        }        
}
const handleGuest=()=>{
  let mail= "demo@demo.com";
  let pass= "demo123";
  auth.signInWithEmailAndPassword(mail,pass).then(()=>{


  }).catch((err)=>{

    console.log(err);
  })


}



  




    return (
        <div className="login-container">
            <h2>Log-in Page</h2>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField error={mailError} helperText={mailHelp} id="mail" required onChange={inputMail}  placeholder="email" type="email" autoComplete="off" inputProps={{ 'aria-label': 'description' }}></TextField>
                <TextField  error={passError} helperText ={passHelp} required onChange={inputPass}  placeholder="password" type="password" inputProps={{ 'aria-label': 'description' } } autoComplete="off"></TextField>
                <Button onClick={handleLogin}variant="contained" color="primary" >Login</Button>
                <div id='alternative-container'>
                    <Typography variant="h6" align="center">Not a Member?</Typography>
                    <div id="alternative">
                      <Link to="/signup"> Sign Up!</Link>                      
                      <Typography display="inline" variant="subtitle1" >or</Typography>
                      <Link to="/main"onClick={handleGuest}>Guest Log-in.</Link>
                    </div>
                </div>

                

            </form>




        </div>



      );
}
 
export default Login;
