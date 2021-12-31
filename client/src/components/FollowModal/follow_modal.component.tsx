import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import FollowBox from "./follow_box.component";

type ModalProps = {
    open: boolean,
    handleClose: () => void,
    follow: Array<{
        id: string,
        handle: string,
        avatar: string,
    }>,
    title: string,
    action: string,
    refetch: () => void,
    buttonStatus: boolean
}

const FollowModal = ({
    open,
    handleClose,
    follow,
    title,
    action,
    refetch,
    buttonStatus
}: ModalProps) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography textAlign='center' style={{ fontSize: "20px" }}>{title}</Typography>
                <Box textAlign="right" borderBottom="1px solid #ccc">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ height: "auto" }}>
                <>
                    {follow.map((fol) => {
                        return <FollowBox key={fol.id} buttonText={action} id={fol.id} handle={fol.handle} avatar={fol.avatar} refetch={refetch} buttonStatus={buttonStatus} />
                    })}
                </>
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
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default FollowModal;
