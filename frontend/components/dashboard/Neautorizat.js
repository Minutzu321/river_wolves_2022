import React from 'react'

import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

export default function Neautorizat() {
  return (
    <div className="card text-center">
        <div className="card-header mt-2">
            <AssignmentLateIcon color="error"/>Contul nu este aprobat<AssignmentLateIcon color="error"/>
        </div>
        <div className="card-body">
            <h3 className="card-title">Aproape gata!</h3>
            <h4 className="card-title">Contul tau trebuie aprobat de un coordonator.</h4>
        </div>
        <div className="card-footer text-muted mb-2">
            <PendingActionsIcon color="success"/>Asteapta cateva minute sau anunta un coordonator.<PendingActionsIcon color="success"/>
        </div>
    </div>
  )
}
