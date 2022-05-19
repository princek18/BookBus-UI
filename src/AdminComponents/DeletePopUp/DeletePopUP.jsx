import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { logout, requestAPI } from "../../utlis/utils";
import { ImCross } from "react-icons/im";
import { Button } from "antd";
import { SuccessPopUp } from '../../utlis/SuccessPopUp';
import { ErrorPopUp } from "../../utlis/ErrorPopUp";


export const DeletePopUp = ({IsModalOpen, setIsModalOpen, data, label}) => {
    const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [openSuccessPopUp, setOpenSuccessPoUp] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const style = {
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "10px",
        pt: 2,
        px: 4,
        pb: 3,
      };

      const handleClose = () => {
          setIsModalOpen(false);
      }

      const handleDelete = () => {
          let params = label === "Bus"?{busId: data._id}: {ticketId: data._id};
          let url = label === "Bus"? '/deletebus': "/deleteticket";
        document.getElementById("loader").style.display = "block";
        requestAPI('DELETE', url, null, params)
        .then((res) => {
            setIsModalOpen(false)
            document.getElementById("loader").style.display = "none";
            setSuccessMessage(res.data.message);
            setOpenSuccessPoUp(true);
        })
        .catch((err) => {
            setIsModalOpen(false)
            document.getElementById("loader").style.display = "none";
            setErrorMessage(err.response.data.message);
            setOpenErrorPoUp(true);
            if (err.response.data.message === "Authentication Failed.") {
              logout();
            }
          });
      }

    return (
        <>
        <Modal open={IsModalOpen}>
        <Box sx={{ ...style, width: 400 }}>
          <ImCross className="cross" size="1.5em" onClick={handleClose} />
          <h2 style={{ margin: "auto" }}>Delete</h2>
          <div style={{ margin: "20px 0px" }}>
            <h3>Do you want to Delete this {label}?</h3>
          </div>
            <Button
              style={{ width: "25%" }}
              type="primary"
              danger
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button
              style={{ width: "25%", marginLeft: "20px"}}
              color="success"
              variant="contained"
              onClick={handleClose}
            >
              No
            </Button>
        </Box>
      </Modal>
      <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
        <SuccessPopUp
        message={successMessage}
        open={openSuccessPopUp}
        setOpen={setOpenSuccessPoUp}
      />
      </>
)}
