import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import TextInput from "./TextInput";
import Button from "./Button";
import { CreatePost, GenerateImageFromPrompt } from "../api";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
`;

const GanerateImage = ({
    createpostloading,
    setCreatePostLoading,
    generateImageLoading,
    setGenerateImageLoaidng,
    post,
    setPost
}) => {
    const navigate = useNavigate();
    const [error,setError] = useState("");

    const generateImage = async () => {
        setGenerateImageLoaidng(true)
        setError("");
        await GenerateImageFromPrompt({prompt: post.prompt})
        .then(() => {
          setPost({...post,photo:response.data.imageUrl})
          setGenerateImageLoaidng(false);
        })
        .catch((error) => {
            setError(error?.response?.data?.message)
            setGenerateImageLoaidng(false)
        })
    }
    const createpost = async () => {
        setCreatePostLoading(true);
        setError("");
        await CreatePost(post)
        .then((response) => {
          navigate("/");
          setCreatePostLoading(false);
        })
        .catch((error) => {
            setError(error?.response?.data?.message)
            setCreatePostLoading(false);
        })
    }
  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>
          Write your prompt according to the image you want to generate!
        </Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) => setPost({...post,name:e.target.value})}
        />
         <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image"
          name="prompt"
          textArea
          rows="8"
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {
            error && <div style={{color : "red"}}>{error}</div>
        }* You can post AI Generate Image to showcase in the community!
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome />}
          flex
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={(e) => generateImage()}
        />
        <Button
          text="Post Image"
          leftIcon={<CreateRounded />}
          type="secondary"
          flex
          isDisabled={
            post.name === "" || post.photo === "" || post.propmt === ""
          }
          isLoading={createpostloading}
          onClick={() => createpost()}
        />
      </Actions>
    </Form>
  )
}

export default GanerateImage