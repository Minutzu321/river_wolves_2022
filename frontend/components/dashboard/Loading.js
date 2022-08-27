import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className="card text-center">
        <div className="card-header mt-2">
            Se incarca..
        </div>
        <div className="card-body">
            <CircularProgress color="secondary" />
        </div>
        <div className="card-footer text-muted mb-2">
            Ne conectam la serverul Riverwolves
        </div>
    </div>
  )
}
