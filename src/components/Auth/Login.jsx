import { Alert, Avatar, Button, Card, CardActions, CardContent, Snackbar, TextField, Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../hooks/API';
import { useForm } from 'react-hook-form';
import InputMask from "react-input-mask";

function Login() {

    const { register, handleSubmit } = useForm();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [snackbarStatus, setSnackbarStatus] = useState(0);
    const [snackbarColor, setSnackbarColor] = useState("info");
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Login'

        if (snackbarStatus === 200) {
          setSnackbarColor("success");
          return;
        }
        if (snackbarStatus === 201) {
          setSnackbarColor("success");
          return;
        } else {
          setSnackbarColor("error");
        }
      }, [snackbarStatus]);

    const onSubmit = async (e) => {
      
        const splitDot = e.cpf.split('.')
        const joinString = splitDot.join('')
        const splitHifen = joinString.split('-')
        const joinToString = splitHifen.join('')
        const cpfNumber = parseInt(joinToString)

        const userRegister = {
            cpf: cpfNumber,
            password: e.password,
        }

        API.post('/auth/Login', userRegister).then(resp => {
          localStorage.setItem('token', resp.data.token)
          setSnackbarStatus(resp.status)
          setSnackbarMsg(resp.data.msg)
          setSnackbarOpen(true)
          navigate('/')
          window.location.reload()
      }).catch(err => {
          setSnackbarStatus(err.response.status)
          setSnackbarMsg(err.response.data[0])
          setSnackbarOpen(true)
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

                    Conta Admin Cpf: 111.111.111-11
                    <InputMask mask="999.999.999-99" maskChar={null} alwaysShowMask={false} {...register("cpf",{required: true})}>
                        {(inputProps) => <TextField {...inputProps} style={{marginBottom: '1rem', marginTop: '0.5rem'}} variant='outlined' label='CPF'></TextField>}
                    </InputMask>

                    Conta Admin Senha: 123
                    <TextField type='password' style={{marginBottom: '2rem', marginTop: '0.5rem'}} variant='outlined' label='Senha' {...register("password",{required: true})}></TextField>
                    <Typography>Ainda não possui uma conta?</Typography>
                    <Typography><Link to='/Register' style={{color: 'white'}}>Criar conta</Link></Typography>
                </CardContent>
                <CardActions style={{padding: '2rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant='outlined' type='submit' style={{width: '150px'}}>Logar</Button>
                </CardActions>
            </form>
        </Card>
        </Container>

        <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
      >
        <Alert severity={snackbarColor}>{snackbarMsg}</Alert>
      </Snackbar>
    </>
  )
}

export default Login