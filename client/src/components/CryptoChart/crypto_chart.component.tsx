import React from "react";
import { Typography } from "@mui/material";


type cryptoProps = {
  coinName: string,
  coinImage: string,
  coinRank: string,
  coinMarketCap: string,
  coinCurrentPrice: string,
  coinATH: string

}
const CryptoChart = ({ coinName, coinImage, coinRank, coinMarketCap, coinCurrentPrice, coinATH }: cryptoProps) => (
  <>
    <div className='header'>
      <h1 className='title'>{coinName} <img height='50px' width='50px' src={coinImage} /></h1>
      <Typography fontFamily='inherit' sx={{ fontSize: "16px" }}><b>MARKET CAP:</b> ${coinMarketCap.toLocaleString()}</Typography>
      <Typography fontFamily='inherit' sx={{ fontSize: "16px" }}><b>CURRENT PRICE:</b> ${coinCurrentPrice.toLocaleString()}</Typography>
      <Typography fontFamily='inherit' sx={{ fontSize: "16px" }}><b>COIN ATH:</b> ${coinATH.toLocaleString()}</Typography>
      <Typography fontFamily='inherit' sx={{ fontSize: "16px" }}><b>COIN RANK:</b> {coinRank}</Typography>
    </div>
  </>
);

export default CryptoChart;