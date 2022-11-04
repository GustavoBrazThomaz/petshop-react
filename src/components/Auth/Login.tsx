import { Avatar, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'
import PetsIcon from '@mui/icons-material/Pets';
import { Container } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PatternFormat } from 'react-number-format';
import SnackbarTemplate from '../../templates/Snackbar/SnackbarTemplate';
import { openSnackbar, snackbarMsg, snackbarStatus } from '../../store/reducers/Snackbar.store';
import API from '../../hooks/API';
import UseCpfFormat from '../../hooks/UseCpfFormat';
import LoginStyle from './LoginStyle';
import LoginIcon from '@mui/icons-material/Login';

function Login() {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let cpf = ''
    document.title = 'Login'
      
    const onSubmit = (e: any) => {
        console.log(e)
        const userRegister = {
            cpf: UseCpfFormat(cpf),
            password: e.password,
        } 
        
        API.post('/auth/Login', userRegister).then(resp => {
          localStorage.setItem('token', resp.data.token)
          dispatch(snackbarStatus(resp.status))
          dispatch(snackbarMsg(resp.data.msg))
          dispatch(openSnackbar())
          navigate('/')
          window.location.reload()
      }).catch(err => {
          dispatch(snackbarStatus(err.response.status))
          dispatch(snackbarMsg(err.response.data[0]))
          dispatch(openSnackbar())
      })
    }
    
  return (
    <>
    <LoginStyle/>
    <div className="login-body-container">
    <Container className='login-container'>
        <Card style={{width: '300px'}}>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <div className='login-card-container'>
                <Avatar className="login-avatar" ><PetsIcon/></Avatar>
                <Typography style={{marginTop: '1rem'}} variant="h5">Login</Typography>
                </div>
                <CardContent className='login-card-content'>
                    <PatternFormat label="Cpf" format='###.###.###-##' mask="_" onChange={(e: any) => cpf = e.target.value} required={true} customInput={TextField}/>
                    <TextField className='login-input' required={true} type='password' variant='outlined' label='Senha' {...register("password",{required: true})}></TextField>
                    <Typography className='login-input'>Ainda não possui uma conta?</Typography>
                    <Typography><Link to='/Register' className='login-link' >Criar conta</Link></Typography>
                </CardContent>

                <CardActions className='login-card-action'>
                    <Button className='login-button' variant='outlined' type='submit' endIcon={<LoginIcon/>}>Entrar</Button>
                </CardActions>
            </form>
        </Card>
        </Container>
        </div>
        <SnackbarTemplate/>       
    </>
  )
}

export default Login