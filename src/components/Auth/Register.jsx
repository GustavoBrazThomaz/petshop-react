import { Alert, Avatar, Button, Card, CardActions, CardContent, Snackbar, TextField, Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputMask from "react-input-mask";
import { useForm } from 'react-hook-form';
import API from '../../hooks/API';

function Register() {
    const { register, handleSubmit } = useForm();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [snackbarStatus, setSnackbarStatus] = useState(0);
    const [snackbarColor, setSnackbarColor] = useState("info");
    const navigate = useNavigate()
    
    useEffect(() => {
        document.title = 'Criar Conta'

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
            name: e.name,
            cpf: cpfNumber,
            email: e.email,
            password: e.password,
            confirmPassword: e.confirmPassword
        }

        API.post('/auth/register', userRegister).then(resp => {
          setSnackbarStatus(resp.status)
          setSnackbarMsg(resp.data.msg)
          setSnackbarOpen(true)
          navigate('/Login')
      }).catch(err => {
          setSnackbarStatus(err.response.status)
          setSnackbarMsg(err.response.data[0])
          setSnackbarOpen(true)
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

                    <InputMask mask="999.999.999-99" maskChar={null} alwaysShowMask={false} {...register("cpf",{required: true})}>
                        {(inputProps) => <TextField {...inputProps} style={{marginBottom: '1rem'}} variant='outlined' label='CPF'></TextField>}
                    </InputMask>
                   
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

export default Register