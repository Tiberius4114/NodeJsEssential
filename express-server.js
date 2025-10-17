const express = require("express");
const app = express();
const path = require("path");
const qs = require("querystring");
const bodyParser = require("body-parser");

const mySystemMiddleware = (req, res, next) => {
  const url = req.url;
  switch (url) {
    case "/":
      console.log("root middleware");
      next();

      break;
    case "/products":
      console.log("products middleware");
      next();

      break;
    case "/contact-us":
      if (req.method === "POST") {
        let chunks = [];

        req.on("data", (data) => {
          chunks.push(data);
        });

        req.on("end", () => {
          const data = Buffer.concat(chunks);
          const formData = data.toString();

          req.body = qs.parse(formData);
          next();
        });
      } else {
        next();
      }

      console.log("contact-us middleware");
      break;
  }
};

//using body parser as req methods listeners

// app.use((req, res, next) => {
//   let data = ""
//   req.on("data", (chunk) => {
//     data += chunk
//   })
//   req.on("end", () => {
//     req.body = qs.parse(data)
//     next()
//   })
// })

//using body parser as bodyParser module

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", mySystemMiddleware, (req, res) => {
  //to get project directory path we could use process.cwd() and __dirname
  //also using path to join them or join them with plus +
  const root_path = path.join(process.cwd(), "./views/index.html");
  //   const root_path = path.join(__dirname, "./views/index.html")
  //   const root_path = __dirname + "/views/index.html"
  res.sendFile(root_path);
});

app.get("/products", mySystemMiddleware, (req, res) => {
  const root_path = path.join(process.cwd(), "./views/products.html");
  res.sendFile(root_path);
});
app.get("/contact-us", mySystemMiddleware, (req, res) => {
  const root_path = path.join(process.cwd(), "./views/contact-us.html");
  res.sendFile(root_path);
});
app.post("/contact-us", mySystemMiddleware, (req, res) => {
  res.send(req.body);
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./views/not-found.html"));
});

app.listen(3012, "127.0.0.1", () => {
  console.log("server listening on port 3012");
});
