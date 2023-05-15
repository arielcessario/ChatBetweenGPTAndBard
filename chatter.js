
// const express = require("express");
// var bodyParser = require('body-parser');


import express from "express";
import { Bard } from "googlebard";
import bodyParser from "body-parser";
import fetch from 'node-fetch';


const app = express();
var jsonParser = bodyParser.json();


talkToChatGpt("Hey ChatGpt, let's talk about technology, but always in short sentences");



async function talkToChatGpt(message) {
    try {
        // const message = req.body.message;


        // Make a request to the OpenAI API to process the message
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer <API-KEY>`
            },
            body: JSON.stringify({

                "messages": [{ "role": "user", "content": message }],
                "model": "gpt-3.5-turbo"

            })
        });

        const data = await response.json();

        // Send the response from the OpenAI API back to the client
        // res.json({ response: data.choices[0].message.content });
        var respuesta = "";
        if(!data.choices){
            respuesta = "let's keep talking about the same subject";
        }else{

            respuesta =  data.choices[0].message.content;
        }

        console.log("ChatGPT: ", respuesta);
        console.log("--------------------------------------------------------------------------------------------------------------------------- ");

        talkToBard(respuesta);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the message.' });
    }
}

let cookies = `__Secure-1PSID=COOKIE`;
async function talkToBard(message) {
    let bot = new Bard(cookies, {
        inMemory: false, // optional: if true, it will not save conversations to disk
        savePath: "./conversations.json", // optional: path to save conversations
    });

    let conversationId = "conversation name"; // optional: to make it remember the conversation


    let response = await bot.ask(message, conversationId); // conversationId is optional



    console.log("Bard: ", response);
    console.log("--------------------------------------------------------------------------------------------------------------------------- ");
    talkToChatGpt(response);
}


