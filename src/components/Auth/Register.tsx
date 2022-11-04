import { Avatar, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';
import { Container } from '@mui/system'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import API from '../../hooks/API';
import { PatternFormat } from 'react-number-format';
import UseCpfFormat from '../../hooks/UseCpfFormat';
import SnackbarTemplate from '../../templates/Snackbar/SnackbarTemplate';
import { useDispatch } from 'react-redux';
import { openSnackbar, snackbarMsg, snackbarStatus } from '../../store/reducers/Snackbar.store';
import LoginStyle from './LoginStyle';

function Register() {
    document.title = 'Criar Conta'

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    let cpf = ""

    const onSubmit = async (e: any) => {
        const userRegister = {
            name: e.name,
            cpf: UseCpfFormat(cpf),
            email: e.email,
            password: e.password,
            confirmPassword: e.confirmPassword
        }

        API.post('/auth/register', userRegister).then(resp => {
          dispatch(snackbarStatus((resp.status)))
          dispatch(snackbarMsg((resp.data.msg)))
          dispatch(openSnackbar())
          navigate('/Login')
      }).catch(err => {
          dispatch(snackbarStatus((err.response.status)))  
          dispatch(snackbarMsg(err.response.data[0]))
          dispatch(openSnackbar())
      })
    }

  return (
    <>
    <LoginStyle/>
    <Container className='login-container'>
        <Card style={{width: '300px', marginTop: '4rem'}}>
            <form onSubmit={handleSubmit(onSubmit)}>  
                <div className='login-card-container'>
                <Avatar className="login-avatar"><PetsIcon/></Avatar>
                <Typography style={{marginTop: '1rem'}} variant="h5">Criar conta</Typography>
                </div>
                <CardContent className='login-card-content'>
                    <TextField className="login-input" variant='outlined' label='Nome' {...register("name",{required: true})}></TextField>
                    <PatternFormat label="Cpf" format='###.###.###-##' mask="_" onChange={(e: any) => cpf = e.target.value} required={true} customInput={TextField} style={{marginTop: '1rem'}}/>
                    <TextField className="login-input" variant='outlined' label='Email' {...register("email",{required: true})}></TextField>
                    <TextField type='password' className="login-input" variant='outlined' label='Senha' {...register("password",{required: true})}></TextField>
                    <TextField type='password' className="login-input" variant='outlined' label='Confirme sua Senha' {...register("confirmPassword",{required: true})}></TextField>
                    <Typography className='login-input'>Já possui uma conta? <Link to='/' className='login-link'>Entrar</Link> </Typography>
                </CardContent>
                <CardActions className='login-card-action'>
                    <Button className='login-button' variant='outlined' type='submit'>Criar Conta</Button>
                </CardActions>
            </form>
        </Card>
        </Container>
        <SnackbarTemplate/>
    </>
  )
}

export default Register