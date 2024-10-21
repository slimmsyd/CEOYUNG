import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Input,
  VStack,
  Text,
  Code,
  Stack,
} from "@chakra-ui/react";

function UploadFile({setselectedFile, selectedFile}: {setselectedFile: (file: File[]) => void, selectedFile: File[]}) {
  const [, setfileURL] = useState("");
  // const [selectedFile, setselectedFile] = useState(null);
  const [uploadedFile, setuploadedFile] = useState({});
  const [isUploading, setisUploading] = useState(false);
  const [isFileUploaded, setisFileUploaded] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const chatBotUrl = " http://127.0.0.1:5000/upload";


  const uploadInput = useRef<HTMLInputElement | null>(null); // Create a ref for the input

  // Track selected file before the upload
  const handleSelectFile = (e: any) => {
    const selectedFileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      selectedFileList.push(e.target.files.item(i));
    }
    setselectedFile(selectedFileList);
  };

  // Upload file to server
  const handleUploadFile = async (e:any) => {
    e.preventDefault();

    setisUploading(true);
    const data = new FormData();

    // Append the file to the request bod
    // Append the file to the request body
    if (uploadInput.current) {
      const inputElement = uploadInput.current as HTMLInputElement;
      if (inputElement.files) { // Check if files is not null
        for (let i = 0; i < inputElement.files.length; i++) {
          data.append("file", inputElement.files[i], inputElement.files[i].name);
        }
      }
    }

    console.log("LOggin he data", data);
    try {
      const config = {
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          setuploadProgress(Math.round((loaded / total) * 100));
        },
      };
      const response = await axios.post(
        chatBotUrl,
        data,
        config
      );
      const body = response.data;
      console.log(body);
      setfileURL(`${chatBotUrl}/${body.filename}`);
      if (response.status === 200) {
        setisFileUploaded(true); // flag to show the uploaded file
        setisUploading(false);
        setuploadedFile(selectedFile); // set the uploaded file to show the name
      }
    } catch (error) {
      console.error(error);
      setisUploading(false);
    }
  };

  return (
    <Flex
      align="center"
      direction="column"
      px={20}
      // bg={"#9DD2F2"}
      // minH={"100vh"}
    >
    
        {/* Upload file form */}
        <form onSubmit={handleUploadFile}>
          {/* <Flex justify="center" align="center" direction="column"> */}
           
              <input
                    type="file"
                    id="fileInput"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleSelectFile}
                    ref={uploadInput} // Assign the ref directly

                  />
                  <button className="textAreaIcon" onClick={() => document.getElementById('fileInput')?.click()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>

        </form>
        {/* Show the upload progress */}
    
    </Flex>
  );
}

export default UploadFile;
