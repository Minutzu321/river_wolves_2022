import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';

export default function Eroare() {
  return (
    <div className="card text-center">
        <div className="card-header mt-2">
            EROARE!
        </div>
        <div className="card-body">
            <ErrorIcon color="error" />
        </div>
        <div className="card-footer text-muted mb-2">
            A aparut o eroare la conexiunea cu serverul!
        </div>
    </div>
  )
}
