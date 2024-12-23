const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")

//by default express follows this route to find files
app.set("views", "./views")
app.set("view engine", "ejs")
//Import routes
const homeRoutes = require("./routes/home")
const adminRoutes = require("./routes/admin")

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

app.use(cookieParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// NOTE: when using req.body, you must fully parse the request body
//       before you call methodOverride() in your middleware stack,
//       otherwise req.body will not be populated.

// parse application/json
app.use(bodyParser.json())

app.use(
  methodOverride((req, res) => {
    const req_body = req.body
    if (req_body && typeof req_body === "object" && "_method" in req_body) {
      // look in urlencoded POST bodies and delete it
      let body_method = req_body._method
      delete body_method
      return body_method
    }
  })
)

app.use(express.static("public"))
app.use("/", homeRoutes)
app.use("/admin", adminRoutes)

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "./views/not-found"))
  res.status(404).render("not-found")
})

app.listen(3012, "127.0.0.1", () => {
  console.log("server listening on port 3012")
})
