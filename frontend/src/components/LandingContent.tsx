import {Container} from "@mui/material";
import React from "react";
import {NewsletterSubscription} from "./NewsletterSubscription";
import {ViewCounter} from "./ViewCounter";

export const LandingContent = () => (
  <Container>
    <h1>Willkommen bei Firma1</h1>
    <h2>Diese Seite befindet sich noch im Aufbau</h2>

    <NewsletterSubscription/>

    <div style={{position: 'absolute', bottom: 75, right: 25}}>
      <ViewCounter/>
    </div>
  </Container>
)