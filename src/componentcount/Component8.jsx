import React, { useEffect, useState } from "react";
import { Maincom } from '../Structrue/Maincom'
export const Component8 = () => {
  const codesnip = {
    python: `
class MathOperations:
    # Method to perform addition
  def add(self, a, b, c=None):
      if c is None:
          return a + b
      else:
          return a + b + c

# Usage
math_ops = MathOperations()

# Scenario 1: Passing only two parameters
result1 = math_ops.add(5, 3)
print("Addition (two parameters):", result1)  # Output: ?

# Scenario 2: Passing three parameters
result2 = math_ops.add(5, 3, 2)
print("Addition (three parameters):", result2)  # Output: ?
   
    
    `}
    const answer = {
      python: `
class MathOperations:
      # Method to perform addition
   def add(self, a, b, c=None):
        if c is None:
            return a + b
        else:
            return a + b + c
  
  # Usage
math_ops = MathOperations()
  
  # Scenario 1: Passing only two parameters
result1 = math_ops.add(5, 3)
print("Addition (two parameters):", result1)  # Output: 8
  
  # Scenario 2: Passing three parameters
result2 = math_ops.add(5, 3, 2)
print("Addition (three parameters):", result2)  # Output: 10
  
      `}

        //  encript the url data
  const lang = 'python';
  const [encryptedURL, setEncryptedURL] = useState("");
  const encryptAndEncodeURL = async (data, password) => {
    const enc = new TextEncoder();
    const encodedPassword = enc.encode(password);

    const key = await crypto.subtle.importKey(
      "raw",
      encodedPassword,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    const aesKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: enc.encode("some-salt"), 
        iterations: 100000,
        hash: "SHA-256"
      },
      key,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12)); 
    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      aesKey,
      enc.encode(data)
    );

    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    const ivBase64 = btoa(String.fromCharCode(...iv));
    return { encryptedBase64, ivBase64 };
  };
  useEffect(() => {
    const encryptData = async () => {
      
      const dataToEncrypt = "https://videos.sproutvideo.com/embed/4491d1b21613e1c8cd/c88103b34ff48db1";
      const password = "guna-techy@codingGame";
      const { encryptedBase64, ivBase64 } = await encryptAndEncodeURL(dataToEncrypt, password);
      const finalEncryptedURL = `https://videoconsole-lac.vercel.app/?game=${encodeURIComponent(encryptedBase64)}&iv=${encodeURIComponent(ivBase64)}&lang=${lang}`;
      setEncryptedURL(finalEncryptedURL);
    };

    encryptData(); 
  }, []);
  return (
    <>
    <Maincom  title={" Method Overloading" }
           codesnip={codesnip}
           game={"https://html-classic.itch.zone/html/10151090/htmlBuild/index.html"}
           url={encryptedURL}
        steps={[
      
    'Explanation:',
    'We define the add method with three parameters, with the third parameter c set to None by default.',
    'Inside the method, we check if the third parameter c is None. If it is, we return the sum of the first two parameters (a and b).',
    'If the third parameter c is not None, we add it to the sum of the first two parameters (a, b, and c).',
    'n Scenario 1, we call the add method with only two parameters (5 and 3). Since the third parameter is not provided, the method returns the sum of the two parameters (5 + 3 = 8).',
    'n Scenario 2, we call the add method with three parameters (5, 3, and 2). Here, all three parameters are provided, so the method returns the sum of all three parameters (5 + 3 + 2 = 10).',
  ]}
  answer={answer}
    />
    </>
  )
}
