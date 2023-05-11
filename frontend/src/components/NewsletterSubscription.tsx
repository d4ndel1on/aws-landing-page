import {Button, List, ListItem, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {API_BASE_URL} from "../constants";

export const NewsletterSubscription = () => {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const onSubscribe = async () => {
    const response = await fetch(API_BASE_URL + '/subscribe', {
      method: 'POST',
      body: JSON.stringify({email}),
    })
    const body = await response.json()
    setError(body.error)
    setMessage(body.result)
  }

  return (
    <List>
      <ListItem>
        <h3>Du willst benachrichtigt werden wenn die Seite fertig ist?</h3>
      </ListItem>

      <ListItem>
        <TextField label="email"
                   inputMode="email"
                   error={!!error}
                   style={{minWidth: 300}}
                   onChange={(e) => setEmail(e.target.value)}
        />
      </ListItem>

      <ListItem>
        <Button variant='contained' onClick={onSubscribe}>Benachrichtige mich</Button>
      </ListItem>
      {message && (
        <ListItem>
          <Typography>{message}</Typography>
        </ListItem>
      )}
      {error && (
        <ListItem>
          <Typography style={{color: 'red'}}>{error}</Typography>
        </ListItem>
      )}
    </List>
  )
}