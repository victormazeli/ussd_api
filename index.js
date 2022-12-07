const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const xml = require("xml");

const app = express();

app.use(cors({origin: true}));

app.post("/session/:sessionId/status", async (req, res) => {
  // const xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
  // const content = req.body;
  const sessionId = req.params.sessionId;
  console.log("sessionId >>", sessionId);

  // res.header("Content-Type", "application/xml");
  res.status(200).send("ok");
});

app.post("/session/:sessionId/start", async (req, res) => {
  // const content = req.body;
  // console.log("content >>", content);

  const displayPlayload = {
    shouldClose: false,
    ussdMenu: "George Municipality: \n1.Statement\n2.Log a Fault\n3.Exit",
    responseExitCode: 200,
    responseMessage: "",
  };
  res.status(200).send(displayPlayload);
});

app.put("/session/:sessionId/response", async (req, res) => {
  const content = req.body;

  if (content.text === "2") {
    const displayPlayload = {
      shouldClose: false,
      ussdMenu: "Log a Fault: \n1.fault\n2.Exit",
      responseExitCode: 200,
      responseMessage: "",
    };
    return res.status(200).send(displayPlayload);
  } else if (content.text === "1") {
    const displayPlayload = {
      shouldClose: false,
      ussdMenu: "Statement: \n1.statement\n2.Exit",
      responseExitCode: 200,
      responseMessage: "",
    };
    return res.status(200).send(displayPlayload);
  } else {
    const displayPlayload = {
      responseExitCode: 200,
      responseMessage: "Thank you for using this service",
    };
    return res.status(200).send(displayPlayload);
  }
});

app.put("/session/:sessionId/end", async (req, res) => {
  const displayPlayload = {
    responseExitCode: 200,
    responseMessage: "Thank you for using this service",
  };
  return res.status(200).send(displayPlayload);
});


exports.api = functions.https.onRequest(app);
