import {Button, List, ListItem, TextField, Typography} from "@mui/material";
import {FormEvent, useState} from "react";
import {API_BASE_URL} from "../constants";

export const NewsletterSubscription = () => {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const onSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch(API_BASE_URL + '/subscribe', {
      method: 'POST',
      body: JSON.stringify({email}),
    })
    const body = await response.json()
    setError(body.error)
    setMessage(body.result)
  }

  return (
    <form onSubmit={onSubscribe}>
      <List>
        <ListItem>
          <h3>Interessiert an Updates?</h3>
        </ListItem>

        <ListItem>

          <TextField label="E-Mail"
                     inputMode="email"
                     error={!!error}
                     style={{minWidth: 300}}
                     helperText={error || ' '}
                     onChange={(e) => setEmail(e.target.value)}
          />
        </ListItem>

        <ListItem>
          <Button type="submit" variant="contained">Benachrichtige mich</Button>
        </ListItem>
        {message && (
          <ListItem>
            <Typography>{message}</Typography>
          </ListItem>
        )}
      </List>
    </form>
  )
}
