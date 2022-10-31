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
    <Container style={{marginTop: '5rem', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card style={{width: '300px'}}>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '1rem'}}>
                <Avatar sx={{ bgcolor: '#327da8', marginTop: '1rem', color: '#fff' }}><PetsIcon/></Avatar>
                <Typography style={{marginTop: '1rem'}} variant="h5">Login</Typography>
                </div>
                <CardContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

                    <PatternFormat label="Cpf" format='###.###.###-##' mask="_" onChange={(e: any) => cpf = e.target.value} required={true} customInput={TextField} style={{marginBottom: '1rem', marginTop: '0.5rem'}}/>
                    <TextField required={true} type='password' style={{marginBottom: '2rem', marginTop: '0.5rem'}} variant='outlined' label='Senha' {...register("password",{required: true})}></TextField>

                    <Typography>Ainda não possui uma conta?</Typography>
                    <Typography><Link to='/Register' style={{color: 'white'}}>Criar conta</Link></Typography>
                </CardContent>

                <CardActions style={{padding: '2rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant='outlined' type='submit' style={{width: '150px'}}>Logar</Button>
                </CardActions>
            </form>
        </Card>
        </Container>
        <SnackbarTemplate/>       
    </>
  )
}

export default Login