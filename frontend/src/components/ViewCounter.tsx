import {useEffect, useState} from "react";
import {CircularProgress, Typography} from "@mui/material";
import {API_BASE_URL} from "../constants";

const VIEWER_ALREADY_SENT_KEY = 'viewer-sent'

export const ViewCounter = () => {
  const [counter, setCounter] = useState<number | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const alreadySent = !!localStorage.getItem(VIEWER_ALREADY_SENT_KEY)

  useEffect(() => {
    setLoading(true)
    fetch(API_BASE_URL + `/viewers?count=${alreadySent ? 'false' : 'true'}`)
      .then(r => r.json())
      .then(r => {
        setCounter(r.viewers)
        setLoading(false)
        localStorage.setItem(VIEWER_ALREADY_SENT_KEY, 'true')
      })
      .catch(() => {
        setCounter(-1)
        setLoading(false)
      })
  }, [setCounter, setLoading])

  if (loading) {
    return <CircularProgress/>
  }

  return <Typography>Diese Seite wurde schon {counter} mal besucht.</Typography>
}