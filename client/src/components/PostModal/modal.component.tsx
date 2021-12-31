import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";

type ModalProps = {
  open: boolean,
  children: React.ReactNode,
  handleClose: () => void,
  saveText: string,
  modalTitle: string,
}

const Modal = ({
  open,
  children,
  handleClose,
  saveText,
  modalTitle,
}: ModalProps) => {

  const ref = React.useRef<HTMLInputElement | any>(null)

  const handleClick = () => {
    if (ref && ref.current) {
      ref.current.handleUpdate();
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography textAlign='center' style={{fontSize: "20px"}}>{modalTitle}</Typography>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent style={{ height: "auto" }}>
        {React.Children.map(children, (child: any) => {
                 return React.cloneElement(child, { ref })
               })}
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          size="small"
          sx={{
            textTransform: "capitalize",
            padding: "6px 20px",
            marginBottom: "20px",
            width: "60%",
            background: "black",
            "&:hover": {
              background: "#333",
            },
          }}
          variant="contained"
          onClick={handleClick}
        >
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;