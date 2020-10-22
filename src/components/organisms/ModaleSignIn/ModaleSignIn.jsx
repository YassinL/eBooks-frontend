import React, { useState } from "react";
import {
  Modal,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import useSignInForm from "../../molecules/UseSignInForm";
import ConnexionIcon from "../../atoms/SVG/ConnexionIcon";
import "./ModaleSignIn.scss";

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

  const { handleSubmit, handleChange, connexion } = useSignInForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="modale">
      <div className="mobile-navbar-icon">
        <div className="mobile-navbar-icon-link" onClick={handleOpen}>
          <ConnexionIcon />
          Connexion
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.root}
      >
        <div className={classes.paper}>
          <Grid className={classes.button}>
            <h2 className={classes.title}>Connexion</h2>
          </Grid>

          <FormControl onSubmit={handleSubmit}>
            <Grid>
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
                onChange={handleChange}
                value={connexion.email}
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
                onChange={handleChange}
                value={connexion.password}
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
              {connexion.errorMessage && (
                <span className="form-error">
                  {connexion.errorMessage.data.description}
                </span>
              )}
            </Grid>
          </FormControl>
        </div>
      </Modal>
    </div>
  );
}
