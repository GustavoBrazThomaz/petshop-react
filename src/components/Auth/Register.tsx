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
    <Container style={{marginTop: '5rem', height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card style={{width: '300px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>  
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '1rem'}}>
                <Avatar sx={{ bgcolor: '#327da8', marginTop: '1rem', color: '#fff' }}><PetsIcon/></Avatar>
                <Typography style={{marginTop: '1rem'}} variant="h5">Criar conta</Typography>
                </div>
                <CardContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <TextField style={{marginBottom: '1rem'}} variant='outlined' label='Nome' {...register("name",{required: true})}></TextField>

                    <PatternFormat label="Cpf" format='###.###.###-##' mask="_" onChange={(e: any) => cpf = e.target.value} required={true} customInput={TextField} style={{marginBottom: '1rem', marginTop: '0.5rem'}}/>
                   
                    <TextField style={{marginBottom: '1rem'}} variant='outlined' label='Email' {...register("email",{required: true})}></TextField>
                    <TextField type='password' style={{marginBottom: '1rem'}} variant='outlined' label='Senha' {...register("password",{required: true})}></TextField>
                    <TextField type='password' style={{marginBottom: '1rem'}} variant='outlined' label='Confirme sua Senha' {...register("confirmPassword",{required: true})}></TextField>
                    <Typography>Já possui uma conta? <Link to='/' style={{color: 'white'}}>Entrar</Link> </Typography>
                </CardContent>
                <CardActions style={{padding: '2rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant='outlined' style={{width: '150px'}} type='submit'>Criar Conta</Button>
                </CardActions>
            </form>
        </Card>
        </Container>
        <SnackbarTemplate/>
    </>
  )
}

export default Register