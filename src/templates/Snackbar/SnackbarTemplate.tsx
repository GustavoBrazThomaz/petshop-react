import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/index"
import { openSnackbar } from '../../store/reducers/Snackbar.store'

function SnackbarTemplate() {
    const dispatch = useDispatch()
    const store = useSelector((state: RootState) => state.rootReducer)
    const snackbar = store.snackbar

  return (
    <>
    {snackbar.snackbarStatus === 200 && 
            <Snackbar
            open={snackbar.openSnackbar}
            onClose={() => dispatch(openSnackbar())}
            autoHideDuration={3000}
          >
          <Alert severity="success">{snackbar.snackbarMsg}</Alert>
        </Snackbar>
    }
    {snackbar.snackbarStatus !== 200 && 
            <Snackbar
            open={snackbar.openSnackbar}
            onClose={() => dispatch(openSnackbar())}
            autoHideDuration={3000}
          >
          <Alert severity="error">{snackbar.snackbarMsg}</Alert>
        </Snackbar>
    }
    {snackbar.snackbarStatus === 201 && 
            <Snackbar
            open={snackbar.openSnackbar}
            onClose={() => dispatch(openSnackbar())}
            autoHideDuration={3000}
          >
          <Alert severity="success">{snackbar.snackbarMsg}</Alert>
        </Snackbar>
    }
    </>
  )
}

export default SnackbarTemplate