import React, { useEffect, useState } from "react";
import { Maincom } from '../Structrue/Maincom'
export const Component10 = () => {
  const codesnip = {
    javascript: `\n// Original code to calculate the sum of squares
    function sumOfSquares(n) {
        let result = 0;
        for (let i = 1; i <= n; i++) {
            result += i * i;
        }
        return result;
    }
    
    // Test the original function
    console.log(sumOfSquares(10));

    // Optimized function using the formula for sum of squares
function sumOfSquaresOptimized(n) {
    return 
}

// Test the optimized function
console.log(sumOfSquaresOptimized(10));

    
    `}
    const answer = {
      javascript: `\n
      
      // Original code to calculate the sum of squares
    function sumOfSquares(n) {
        let result = 0;
        for (let i = 1; i <= n; i++) {
            result += i * i;
        }
        return result;
    }
    
    // Test the original function
    console.log(sumOfSquares(10));
    
    // Optimized function using the formula for sum of squares
function sumOfSquaresOptimized(n) {
    return (n * (n + 1) * (2 * n + 1)) / 6;
}

// Test the optimized function
console.log(sumOfSquaresOptimized(10));
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
    
    <Maincom  title={"Performance Optimization"}
       codesnip={codesnip}
       game={"https://gunaasin.github.io/rabitrunPerformanceOptimization/"}
       url={encryptedURL}
    steps={[' Optimization Techniques: After identifying bottlenecks, optimization techniques are applied to improve performance. These techniques can vary depending on the nature of the bottleneck but may include:',

    '--> Algorithmic Optimization: Improving the efficiency of algorithms to reduce time complexity and optimize resource usage.',
    '--> Data Structures: Choosing appropriate data structures that offer fast insertion, deletion, and retrieval operations.',
    '--> Concurrency: Utilizing concurrency and parallelism to execute tasks simultaneously and make better use of multi-core processors.',
    '--> Caching: Introducing caching mechanisms to store frequently accessed data and reduce the need for expensive computations or database queries',
    '--> I/O Optimization: Optimizing disk I/O operations by minimizing disk reads and writes or using asynchronous I/O.',
'Step 1: Use the formula for the sum of squares of the first n natural numbers: (n * (n + 1) * (2 * n + 1)) / 6.',
'Step 2: Test the optimized function',
'Step 3: If the function is called multiple times with the same input, you can cache the results to avoid redundant calculations.+',
'Consider browser-specific optimizations, such as using the latest ECMAScript features, leveraging browser-specific APIs for performance, or optimizing DOM manipulation.'
]}
answer={answer}
/>
    </>
  )
}
