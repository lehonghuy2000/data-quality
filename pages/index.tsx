import { Button, TextField } from "@mui/material";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import React, { useState } from "react";

const Tittle = styled.h1`
  margin-top: 50px;
  font-size: 72px;
  color: white;
`;
const Container = styled.div`
  background: #b92b27; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1565c0,
    #b92b27
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1565c0,
    #b92b27
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const InputFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
const Notification = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
const Spiner = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;
const SubmitButton = styled.button`
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 15px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform, opacity;
  z-index: 0;
  margin-top: 10px;

  &:hover {
    background: #f6f9fe;
    color: #174ea6;
  }

  &:active {
    box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
      0 8px 12px 6px rgb(60 64 67 / 15%);
    outline: none;
  }

  &:focus {
    outline: none;
    border: 2px solid #4285f4;
  }

  &:not(:disabled) {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }

  &:not(:disabled):hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0 2px 3px 0,
      rgba(60, 64, 67, 0.15) 0 6px 10px 4px;
  }

  &:not(:disabled):focus {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }

  &:not(:disabled):active {
    box-shadow: rgba(60, 64, 67, 0.3) 0 4px 4px 0,
      rgba(60, 64, 67, 0.15) 0 8px 12px 6px;
  }

  &:disabled {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }
`;

const Upload = () => {
  const [selectedFile, updatestate] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const onFileChange = (event: any) => {
    updatestate(event.target.files[0]);
  };
  const onFileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile as any);
    await axios.post(
      "https://data-quality-honor2018.azurewebsites.net",
      formData
    );

    router.push("/result");
  };
  if (isLoading)
    return (
      <Notification>
        <h1>In process, please don't reload </h1>
        <Spiner>
          <ClipLoader loading={isLoading} />
        </Spiner>
        {/* <ReloadButton onClick={onClickHandle}>Reload</ReloadButton> */}
      </Notification>
    );
  return (
    <Container>
      <Tittle>DATA QUALITY</Tittle>
      <InputFile>
        <TextField
          type="file"
          id="contained-button-file"
          onChange={onFileChange}
        />
        <SubmitButton onClick={onFileUpload}>Upload</SubmitButton>
      </InputFile>
    </Container>
  );
};

export default Upload;
