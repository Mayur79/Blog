import { useState, useContext } from 'react';

import { Box, TextField, Button, styled, Typography } from '@mui/material'
import API from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
const Components = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/0.5);

`
const Error = styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`
const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding:25px 30px;
    display:flex;
    flex:1;
    flex-direction:column;
    &>div,&>button,&>p{
        margin-top:20px;
    }
`
const LoginButton = styled(Button)`
    text-transform:none; 
    background-color:orange;
    color:#fff;
    height:48px;
    border-radius:2px;   
`

const SignupButton = styled(Button)`
     text-transform:none; 
    background-color:#fff;
    color:#2874f0;
    height:48px;
    border-radius:2px;
    box-shadow:0px 2px 4px 0 rgb(0 0 0/20%);
`

const Text = styled(Typography)`
    color:#878787;
    font-size:16px;    
`

const signupInitialvalues = {
    name: '',
    username: '',
    password: ''
};
const loginInitialvalues = {
    username: '',
    password: ''
};
const Login = ({ isUserAuthenticated }) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState('signupInitialvalues');
    const [login, setLogin] = useState('loginInitialvalues');
    const [error, showError] = useState('');
    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialvalues);
            toggleAccount('login');
        }
        else {
            showError("Something went wrong")
        }
    }
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');
            sessionStorage.setItem('accessToken', `Bearer${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true);
            navigate('/');

        }
        else {
            showError("Something is wrong")
        }
    }
    return (
        <Components>
            <Box>
                <Image src={imageURL} alt="login" />
                {account === 'login' ?
                    <Wrapper>
                        <TextField id="standard-basic" value={login.username} onChange={(e) => onValueChange(e)} name='username' label="Enter username" variant="standard" />
                        <TextField id="standard-basic" value={login.password} onChange={(e) => onValueChange(e)} name='password' label="Enter password" variant="standard" />
                        {error && <Error>{error}</Error>}
                        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField id="standard-basic" onChange={(e) => onInputChange(e)} name='name' label="Enter Your Name" variant="standard" />
                        <TextField id="standard-basic" onChange={(e) => onInputChange(e)} name='username' label="Enter Your Username" variant="standard" />
                        <TextField id="standard-basic" onChange={(e) => onInputChange(e)} name='password' label="Enter your password" variant="standard" />
                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton variant='contained' onClick={() => toggleSignup()}>Already have an account</LoginButton>
                    </Wrapper>
                }
            </Box>
        </Components >
    )
}
export default Login