import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

import React from 'react'


const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="30%" mt='10px'>
    <Text mb={2} fontSize="lg">
      Console :
    </Text>
    <Button
      position="absolute"
      top="0px"
      margin={4}
      right="5px"
      variant="outline"
      colorScheme="green"
      mb={4}
      isLoading={isLoading}
      onClick={runCode}
    >
      Run Code
    </Button>
    <Box
      height="61vh" 
      w='36vw'
      p={2}
      color={isError ? "red.400" : ""}
      border=" 1px solid "
      borderRadius={4}
      bg={isError?"#af10102b" :"#130D1E"}
      borderColor={isError ? "red.500" : "#333"}
      
    >
      {output
        ? output.map((line, i) => <Text key={i}>{line}</Text>)
        : ''}
    </Box>
  </Box>
  );
};
export default Output;