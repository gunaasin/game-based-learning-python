import React, { useEffect, useState } from "react";
import { Maincom } from '../Structrue/Maincom'

export const Component2 = () => {
  const [runCodeData] = useState(null);
const codesnip = {
    python: `
#Lists: 

my_list = [1, 2, 3]
my_list[0] = 10  # Modifying the first element
print(my_list)   # Output: [?, 2, 3]

#Dictionaries:

my_dict = {'name': 'Alice', 'age': 30}
my_dict['age'] = 25  # Modifying the value associated with the key 'age'
print(my_dict)       # Output: {'name': 'Alice', 'age': ?}

#Sets:

my_set = {1, 2, 3}
my_set.add(4)  # Adding a new element to the set
print(my_set)  # Output: {1, 2, 3, ?}
    
        
`}

    const answer = {
      python: `
#Lists:

my_list = [1, 2, 3]
my_list[0] = 10  # Modifying the first element
print(my_list)   # Output: [10, 2, 3]

#Dictionaries:

my_dict = {'name': 'Alice', 'age': 30}
my_dict['age'] = 25  # Modifying the value associated with the key 'age'
print(my_dict)       # Output: {'name': 'Alice', 'age': 25}

#Sets:

my_set = {1, 2, 3}
my_set.add(4)  # Adding a new element to the set
print(my_set)  # Output: {1, 2, 3, 4}

  
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
      <Maincom title={"Mutable Objects"}

       game={'https://html-classic.itch.zone/html/907611/index.html?v=1542780907&quot'}
       url={encryptedURL}
       
        steps={['Mutable Objects:',
        
        'Lists are one of the most commonly used data structures in Python. They are ordered collections of elements, and their elements can be modified after creation.Elements within a list can be accessed using indexing, and because lists are mutable, individual elements or slices of elements can be modified, added, or removed.',
        'Dictionaries are another fundamental data structure in Python. They consist of key-value pairs, and like lists, dictionaries are mutable.Key-value pairs in dictionaries can be added, removed, or modified after creation.',
        'Sets are collections of unique elements. They are unordered and do not allow duplicate elements.Sets are mutable, meaning elements can be added or removed after creation.',
         
        ]}
         answer={answer}
         codesnip={codesnip}

      />

    </>
  )
}

export const ChildComponent = ({ runCodeData}) => {
  
  return (
    
    <div className='testcase' >
      {runCodeData === true && <p className='blutext'>Ready to Run  </p>}
      {runCodeData === false && <p className='redtext '>Test case Failed ! </p>}
      {runCodeData === null && <p className='blutext'>Waiting for code comparison...</p>}
    </div>
    
  )
}
