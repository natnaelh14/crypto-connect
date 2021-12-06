import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";

type ModalProps = {
    open: boolean,
    handleClose: () => void,
    coinName: string,
    coinDescription: string,
    coinWhitePaper: string,
    coinStructure: string,
    coinProof: string,
    coinImage: string,
    coinMarketCap: number,
    coinMarketCapRank: number,
    coinCurrentPrice: number,
    coinSymbol: string,
    coinRank: number,
    coinAllTime: number,
    coinSupply: number
}

const MoreInfoCryptoModal = ({ open, handleClose, coinRank, coinAllTime, coinSupply, coinName, coinDescription, coinWhitePaper, coinStructure, coinProof, coinImage, coinMarketCap, coinMarketCapRank, coinCurrentPrice, coinSymbol }: ModalProps) => {

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box textAlign="right" borderBottom="1px solid #ccc">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ height: '550px' }}>
                <Box pb='0.5rem' mb='1rem' borderBottom="1px solid #ccc">
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <img width='75' height='75' src={coinImage} alt='coinImage' />
                        <Typography fontFamily='inherit' style={{ fontSize: '25px' }}>{coinName.toUpperCase()} - {coinSymbol.toUpperCase()}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography fontFamily='inherit' mb='0.75rem' textAlign='justify' style={{ fontSize: '15px' }}><b>DESCRIPTION:</b> {coinDescription}</Typography>
                    <Typography fontFamily='inherit' mb='0.75rem' sx={{ fontSize: '15px' }}><b>WHITE PAPER:</b> <a target="_blank" style={{ textDecoration: 'none' }} href={coinWhitePaper}>{coinWhitePaper}</a></Typography>
                    <Typography fontFamily='inherit' mb='0.75rem' sx={{ fontSize: '15px' }}><b>COIN STRUCTURE:</b> {coinStructure}</Typography>
                    <Typography fontFamily='inherit' mb='0.75rem' sx={{ fontSize: '15px' }}><b>COIN PROOF:</b> {coinProof}</Typography>
                    <Typography fontFamily='inherit' mb='0.75rem' sx={{ fontSize: '15px' }}><b>COIN RANK:</b> {coinRank.toLocaleString()}</Typography>
                    <Typography fontFamily='inherit' mb='0.75rem' sx={{ fontSize: '15px' }}><b>MARKET CAP:</b> ${coinMarketCap.toLocaleString()}</Typography>
                    <Typography fontFamily='inherit' mb='0.75rem' sx={{ fontSize: '15px' }}><b>CURRENT PRICE:</b> ${coinCurrentPrice.toLocaleString()}</Typography>
                    <Typography fontFamily='inherit' mb='0.75rem' sx={{ fontSize: '15px' }}><b>ALL TIME HIGH:</b> ${coinAllTime.toLocaleString()}</Typography>
                    <Typography fontFamily='inherit' mb='0.75rem' sx={{ fontSize: '15px' }}><b>CIRCULATING SUPPLY:</b> {coinSupply.toLocaleString()}</Typography>
                </Box>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    type="submit"
                    size="small"
                    sx={{
                        textTransform: "capitalize",
                        padding: "6px 20px",
                        marginBottom: '20px',
                        width: "60%",
                        background: "black",
                        fontFamily: 'inherit',
                        "&:hover": {
                            background: "#333",
                        },
                    }}
                    variant="contained"
                    onClick={handleClose}
                >
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MoreInfoCryptoModal;
