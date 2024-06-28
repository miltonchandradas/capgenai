const cds = require("@sap/cds");
const fs = require("fs");
const pdf = require("pdf-parse");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

module.exports = async (srv) => {
  const { Certifications, Units } = srv.entities;

  srv.on("generateQuestions", async () => {
    console.log("Generate questions...");
  });

  srv.on("uploadPDF", async (req) => {
    if (req.data.content) {
      let content;

      // Read stream
      req.data.content.on("data", (chunk) => {
        // console.log(chunk);
        content += chunk;
      });

      // Output stream
      req.data.content.on("end", async () => {
        console.log("Stream ended");
        // console.log(content);

        try {
          let data = await pdf(Buffer.from(content, "binary"));

          console.log("Number of pages: ", data.numpages);
          console.log("PDF info: ", data.info);
          // console.log("File content: ", data.text);
        } catch (error) {
          console.log("Error: ", error);
          req.reject(500, "Internal Server Error");
        }
      });
    } else {
      return next();
    }
  });

  srv.on("UPDATE", Units, async (req) => {
    console.log("Request received...")
    try {
      let ID = req.data?.ID;

      let buffer = fs.readFileSync(
        "uploads/" + req.data?.content?.file?.filename
      );
      let data = await pdf(buffer);

      console.log("Number of pages: ", data.numpages);
      console.log("PDF info: ", data.info);
      console.log("File content: ", data.text);

      await UPDATE(Units, { ID }).with({ text: data.text });
    } catch (error) {
      console.log("Error: ", error);
      req.reject(500, "Internal Server Error");
    }
  });

  // srv.on("UPDATE", Units, async (req) => {
  //   let ID = req.data.ID;

  //   if (req.data.content) {
  //     let content;

  //     // Read stream
  //     req.data.content.on("data", (chunk) => {
  //       // console.log(chunk);
  //       content += chunk;
  //     });

  //     // Output stream
  //     req.data.content.on("end", async () => {
  //       console.log("Stream ended");
  //       // console.log(content);

  //       // await UPDATE(Certifications, { ID }).with({ content });

  //       try {
  //         let data = await pdf(Buffer.from(content, "binary"));

  //         console.log("Number of pages: ", data.numpages);
  //         console.log("PDF info: ", data.info);
  //         console.log("File content: ", data.text);
  //       } catch (error) {
  //         console.log("Error: ", error);
  //         req.reject(500, "Internal Server Error");
  //       }
  //     });
  //   } else {
  //     return next();
  //   }
  // });
};
