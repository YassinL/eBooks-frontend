import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#FCFCFC",
    boxShadow: theme.shadows[2],
    borderRadius: 5,
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    border: "none",
    marginTop: 25,
    backgroundColor: "#5097ab",
    color: "#FCFCFC",
    padding: 10,
  },
  close: {
    fontWeight: 600,
    paddingBottom: 40,
    cursor: "pointer",
  },
}));

export default function ModaleAlert({ OneBook }) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");

  const handleDelete = async (event) => {
    try {
      event.preventDefault();

      await axios.delete(
        `http://localhost:8085/api/books/${OneBook.urlTitle}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
      history.push("/books");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="profil_testimonies_box_buttons_update"
        type="button"
        onClick={handleOpen}
      >
        Supprimer l'annonce du livre
      </button>
      <Modal
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.close} onClick={handleClose}>
              <p>X</p>
            </div>
            <p id="transition-modal-description">
              Êtes-vous sûr de supprimer ce Livre ?
            </p>
            <button
              className={classes.button}
              type="submit"
              onClick={handleDelete}
            >
              {" "}
              Supprimer{" "}
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
