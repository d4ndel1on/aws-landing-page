import {Container, Grid} from "@mui/material";
import React from "react";
import {NewsletterSubscription} from "./NewsletterSubscription";
import {ViewCounter} from "./ViewCounter";

export const LandingContent = () => (
  <Container>
    <Grid container>
      <Grid item xs={12} lg={6}>
        <h1>Willkommen auf der Webseite</h1>
        <h2>Diese Seite befindet sich noch im Aufbau</h2>

        <NewsletterSubscription/>
      </Grid>

      <Grid item xs={12} lg={6} style={{marginTop: 25, textAlign: 'center'}}>
        <img src="/qr-code.png" style={{maxHeight: 300}} alt="qr-code"/>
      </Grid>

      <Grid item xs={12}>
      </Grid>
    </Grid>

    <div style={{position: 'absolute', bottom: 75, right: 25}}>
      <ViewCounter/>
    </div>
  </Container>
)