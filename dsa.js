//making a dsa instructor

import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync'
import dotenv from 'dotenv';

dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.api_key });


let historyarr=[]

async function main(userinput) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: historyarr,
    config: {
      systemInstruction: "You are a DSA chatbot, you have to only answer questiosn related to DSA in computer science, try to give simplest explanation as possible, only try to avoid answer those questions that are not realted to dsa and answer it in this way like use this chatbot only for dsa, tell this thing to user in a funny way. If you are giving some code then always try to give in c++ language, in case user asks for another language , you can give code in that language, but dont get distracted from dsa topic. ",
    },
  });
//   console.log(response.text);

  historyarr.push({
     role:"model",
    parts:[{text: response.text}]

  })

  let data=response.text
  

  return data
}


async function callerfnc(query){
    // while(true){
        // let userinput=readlineSync.question("Enter your question (type \"exit\" to end convo...)")
        // if(userinput.trim().toLowerCase() ==="exit"){
        //     return;
        // }

        historyarr.push({
            role:"user",
            parts:[{text: query}]

        })
        return await main(query)

    // }
    

}

// callerfnc();

export {callerfnc}