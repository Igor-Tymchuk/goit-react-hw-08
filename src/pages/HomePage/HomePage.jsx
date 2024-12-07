import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ArrowUpward";
import s from "./HomePage.module.css";
import { useEffect, useState } from "react";
import {
  FcBusinessContact,
  FcAbout,
  FcDataConfiguration,
  FcRules,
} from "react-icons/fc";

const HomePage = () => {
  const [policy, setPolicy] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#policy") return setPolicy(true);
  }, []);

  return (
    <Box>
      <FcBusinessContact className={s.logo} />
      <h1 className={s.title}>Welcome to PhoneBook!</h1>
      <h3 className={s.title}>This app will help you improve your life!</h3>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <FcAbout />
            &nbsp; Information about founder here!
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ fontStyle: "italic" }}>
          <Typography>
            Hello. My name is Igor Tymchuk. I am a beginner fullstack developer.
            Now skills are HTML, CSS, JavaScript, React, Redux, SASS. I have
            experience with some JS libraries. Now, I am looking for a job as a
            Frontend Developer. About myself: Calm, attentive, optimistic, I
            have a sense of humor.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <FcDataConfiguration />
            &nbsp;Used libraries to create this App
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ fontStyle: "italic" }}>
          <List>
            <ListItem>@emotion/react: ^11.13.5</ListItem>
            <ListItem>@emotion/styled: ^11.13.5</ListItem>
            <ListItem>@mui/icons-material: ^6.1.10</ListItem>
            <ListItem>@mui/material: ^6.1.9</ListItem>
            <ListItem>@reduxjs/toolkit: ^2.3.0</ListItem>
            <ListItem>axios: ^1.7.8</ListItem>
            <ListItem>clsx: ^2.1.1</ListItem>
            <ListItem>formik: ^2.4.6</ListItem>
            <ListItem>react: ^18.3.1</ListItem>
            <ListItem>react-hot-toast: ^2.4.1</ListItem>
            <ListItem>react-icons: ^5.3.0,</ListItem>
            <ListItem>react-loader-spinner: ^6.1.6</ListItem>
            <ListItem>react-redux: ^9.1.2</ListItem>
            <ListItem>react-router-dom: ^7.0.1</ListItem>
            <ListItem>redux-persist: ^6.0.0</ListItem>
            <ListItem>yup: ^1.4.0</ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={policy} onChange={() => setPolicy(!policy)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography id="policy">
            <FcRules />
            &nbsp;Terms and Conditions
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ fontStyle: "italic" }}>
          <List>
            <ListItem>
              Be respectful when adding or sharing contact information; only
              include details with permission.
            </ListItem>
            <ListItem>
              Do not upload or share false, offensive, or inappropriate
              information.
            </ListItem>
            <ListItem>
              Protect the privacy of others by adhering to data protection
              guidelines and avoiding unauthorized sharing.
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default HomePage;
