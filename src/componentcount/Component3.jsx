import React, { useEffect, useState } from "react";
import { Maincom } from '../Structrue/Maincom';
export const Component3 = () => {
  const codesnip = {
    python: `
#Tuple:

my_tuple = (1, 2, 3)
    # Trying to modify a tuple will result in an error
my_tuple[0] = 10  
    # This will raise a TypeError

#String:

my_string = "Hello"
    # Trying to modify a string will result in an error
my_string[0] = 'h'  
    # This will raise a TypeError

#Numbers (int, float):

my_number = 5
    # Trying to modify a number will result in an error
my_number += 1  
    # This will raise a TypeError

#Frozen sets:

my_frozen_set = frozenset({1, 2, 3})
    # Trying to modify a frozen set will result in an error
my_frozen_set.add(4) 
    # This will raise an AttributeError


 

    `}
    const answer = {
     python: 
      `
#Tuple:

my_tuple = (1, 2, 3)
    # Trying to modify a tuple will result in an error
my_tuple[0] = 10
    # This will raise a TypeError

#String:

my_string = "Hello"
    # Trying to modify a string will result in an error
my_string[0] = 'h'  
    # This will raise a TypeError

#Numbers (int, float):

my_number = 5
    # Trying to modify a number will result in an error
my_number += 1  
    # This will raise a TypeError

#Frozen sets:

my_frozen_set = frozenset({1, 2, 3})
    # Trying to modify a frozen set will result in an error
my_frozen_set.add(4) 
    # This will raise an AttributeError



    
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
    <Maincom  title={"Immutable Objects"}
    game={"https://jamesmartin02.github.io/gameio/"}
    url={encryptedURL}
     steps={['Immutable objects :',
     'Tuples are immutable sequences of elements. Once a tuple is created, its elements cannot be changed, added, or removed. While individual elements of a tuple can be accessed using indexing, any attempt to modify them will result in an error.',
     'Strings are immutable sequences of characters. Once a string is created, its characters cannot be modified. While individual characters of a string can be accessed using indexing, any attempt to modify them will result in an error.',
     'Numeric types in Python, such as integers and floats, are immutable. Once created, their values cannot be changed.Any attempt to modify a number will result in a new object being created with the updated value.',
     'Frozen sets are immutable versions of sets. Once created, the elements in a frozen set cannot be modified.Frozen sets can be useful in scenarios where you need an immutable collection of unique elements.',
     ]}
     answer={answer}
     codesnip={codesnip}
     />
    </>
  )
}
