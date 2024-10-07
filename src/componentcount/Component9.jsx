import React, { useEffect, useState } from "react";
import { Maincom } from '../Structrue/Maincom'
export const Component9 = () => {
  const codesnip = {
    python:`
class Animal:
    def make_sound(self):
        return "Generic sound"

class Dog(Animal):
    def make_sound(self):
        return "Bark!"

# Create instances of the classes
animal = Animal()
dog = Dog()

# Call the make_sound method on instances
print(animal.make_sound())  # Output: ***************
print(dog.make_sound())     # Output: *****


    
    
    `}
    const answer = {
      python:`
class Animal:
      def make_sound(self):
          return "Generic sound"
  
class Dog(Animal):
      def make_sound(self):
          return "Bark!"
  
  # Create instances of the classes
animal = Animal()
dog = Dog()
  
  # Call the make_sound method on instances
print(animal.make_sound())  # Output: Generic sound
print(dog.make_sound())     # Output: Bark!
  
  
        
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
    <Maincom  title={" Method Overriding"}
    codesnip={codesnip}
           game={"https://html-classic.itch.zone/html/5257904/index.html"}
           url={encryptedURL}
        steps={[
          'Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass. This allows the subclass to modify or extend the behavior of the method inherited from the superclass',
          'In this example, both Animal and Dog classes have a make_sound method. However, the Dog class overrides the make_sound method inherited from the Animal class with its own implementation. When calling make_sound on a Dog instance, it executes the overridden method from the Dog class rather than the one from the Animal class.',
        ]}
        answer={answer}
        />
    </>
  )
}