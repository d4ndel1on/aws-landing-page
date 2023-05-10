import {Button, Dialog, Paper, Typography} from '@mui/material';

export type ImpressDialogProps = {
  open: boolean
  onClose: () => void
}

export const ImpressDialog = ({open, onClose}: ImpressDialogProps) => {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <Paper elevation={1} style={{padding: 25}} color="primary">
        <Paper elevation={2}
               style={{paddingLeft: 10, paddingRight: 10, lineHeight: 2, textAlign: 'center'}}>
          <h2>Impressum</h2>
        </Paper>
        <Typography fontWeight="bold" fontSize={16}>Informationen für §5 TMG</Typography>
        <Typography fontSize={15}>
          Stefan Hoferer<br/>
          Schönberg 4<br/>
          84564 Oberbergkirchen
        </Typography>
        <Typography fontWeight="bold" fontSize={16} style={{marginTop: 10}}>Kontakt</Typography>
        <Typography fontSize={15}>
          Phone: (+49) 01623390867<br/>
        </Typography>
        <Button
          style={{float: 'right', marginTop: 45, fontWeight: 'bold'}}
          color="primary"
          variant="contained"
          onClick={() => onClose()}>
          Schließen
        </Button>
      </Paper>
    </Dialog>
  )
}