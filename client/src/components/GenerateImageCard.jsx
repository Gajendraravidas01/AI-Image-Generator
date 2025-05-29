import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow + 90};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height:auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.black + 50};
  border-radius: 18px;
  object-fit: cover;
`;

const GenerateImageCard = ({src,loading}) => {
  console.log("src",src) ;
  return (
    <Container>
      {loading ? (
        <React.Fragment>
          <CircularProgress
            sx={{ color: "inherit", width: "24px", height: "24px" }}
          />
          Generating Your Image . . .
        </React.Fragment>
      ) : src ? (
        <Image src={src} />
      ) : (
        <React.Fragment>Write a prompt to generate image</React.Fragment>
      )}
    </Container>
  )
}

export default GenerateImageCard