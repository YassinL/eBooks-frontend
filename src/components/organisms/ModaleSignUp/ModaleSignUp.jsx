import React, { useState } from "react";
import {
  Modal,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import useSignUpForm from "../../molecules/UseSignUpForm";
import ProfileIcon from "../../atoms/SVG/ProfileIcon";
import "./ModaleSignUp.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    padding: theme.spacing(2, 4, 3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 16,
  },
}));

export default function ModaleSignup() {
  const classes = useStyles();

  const { data, handleInputChange, handleSubmit } = useSignUpForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(data);
  return (
    <div className="modale">
      <div className="mobile-navbar-icon">
        <div className="mobile-navbar-icon-link" onClick={handleOpen}>
          <ProfileIcon />
          Inscription
        </div>
      </div>

      {/* <button className="modale-button" type="button" onClick={handleOpen}>
        <ProfileIcon />
        Inscription
      </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.root}
      >
        <div className={classes.paper}>
          <Grid className={classes.button}>
            <h2 className={classes.title}>Inscription</h2>
          </Grid>

          <FormControl onSubmit={handleSubmit}>
            <Grid>
              <TextField
                id="outlined-full-width"
                name="firstName"
                type="text"
                label="Prénom"
                placeholder="Prénom"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleInputChange}
                value={data.firstName}
              />
              <TextField
                id="outlined-full-width"
                name="lastName"
                type="text"
                label="Nom"
                placeholder="Nom"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleInputChange}
                value={data.lastName}
              />
              <TextField
                id="outlined-full-width"
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleInputChange}
                value={data.email}
              />
              <TextField
                id="outlined-full-width"
                type="password"
                name="password"
                label="Mot de Passe"
                placeholder="Mot de Passe"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleInputChange}
                value={data.password}
              />
              <TextField
                id="outlined-full-width"
                name="birthday"
                type="date"
                label="Date de Naissance"
                placeholder="Date de Naissance"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleInputChange}
                value={data.birthday}
              />
              <TextField
                id="outlined-full-width"
                name="phoneNumber"
                label="Téléphone"
                placeholder="Téléphone"
                type="text"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleInputChange}
                value={data.phoneNumber}
              />
            </Grid>
            <Grid className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Envoyer
              </Button>
              {data.errorMessage && (
                <span className="form-error">
                  {data.errorMessage.data.description}
                </span>
              )}
            </Grid>
          </FormControl>
        </div>
      </Modal>
    </div>
  );
}
