import {Container} from "@mui/material";
import React from "react";
import {NewsletterSubscription} from "./NewsletterSubscription";
import {ViewCounter} from "./ViewCounter";

export const LandingContent = () => (
  <Container>
    <h1>Willkommen auf der Lightning Talk Demoseite</h1>

    <NewsletterSubscription/>

    <div style={{position: 'absolute', bottom: 75, right: 25}}>
      <ViewCounter/>
    </div>
  </Container>
)