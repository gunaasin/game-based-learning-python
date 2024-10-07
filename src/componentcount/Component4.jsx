import React, { useEffect, useState } from "react";
import { Maincom } from '../Structrue/Maincom';
export const Component4 = () => {
  const codesnip = {
    python: 
`class BankAccount:
    def __init__(self, balance=0):
        self._balance = balance  # Encapsulated attribute

    def deposit(self, amount):
        self._balance += amount

    def withdraw(self, amount):
        if self._balance >= amount:
            self._balance -= amount
        else:
            print("Insufficient funds")

    def get_balance(self):
        return self._balance

# Usage
acc = BankAccount(1000)
acc.withdraw(500)
print(acc.get_balance())  # Output: ?
     

  
    `}
    const answer ={
      python:
`class BankAccount:
      def __init__(self, balance=0):
          self._balance = balance  # Encapsulated attribute
  
      def deposit(self, amount):
          self._balance += amount
  
      def withdraw(self, amount):
          if self._balance >= amount:
              self._balance -= amount
          else:
              print("Insufficient funds")
  
      def get_balance(self):
          return self._balance
  
# Usage
acc = BankAccount(1000)
acc.withdraw(500)
print(acc.get_balance())  # Output: 500
      
   
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

    <Maincom  title={"Encapsulation"}
    answer={answer}
    game={"https://html-classic.itch.zone/html/1970387/index.html?v=1582568685"}
    url={encryptedURL}
       steps={['Encapsulation is the bundling of data (attributes) and methods (functions) that operate on the data into a single unit, called a class. It allows for data hiding, where the internal workings of a class are hidden from the outside world, and abstraction, where only essential details are exposed to the user',
       'In this example:', 
       'balance is encapsulated within the BankAccount class. Users interact with the class through defined methods (deposit, withdraw, get_balance), maintaining data integrity and hiding the internal representation of the balance. Encapsulation ensures that the balance can only be modified through predefined methods, preventing direct access and potential misuse.',
     
       ]}
       codesnip={codesnip}
       />
    
    </>
  )
}
