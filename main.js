const http = require("http")
const qs = require("querystring")
const fs = require("node:fs")

const server = http.createServer((req, res) => {
  const get_method = req.method === "GET"
  const post_method = req.method === "POST"
  const home_url = req.url === "/"
  if (home_url && get_method) {
    fs.readFile("db.txt", "utf8", (_, data) => {
      let object = {}
      let splitted_data = data.split("\n")
      let flatted_data = splitted_data.filter(
        (txt, i, arr) => !!txt && arr.indexOf(txt) === i
      )
      for (let key in flatted_data) {
        object[key] = flatted_data[key]
      }

      const dynamicContent = Object.values(object)
        .map((i, k) => {
          return `<span key="${k + 1}">${k + "-" + i}</span></br></br>`
        })
        .join("") // Join array elements into a single string
      res.setHeader("Content-Type", "text/html")
      res.write(`
        <html>
          <head>
            <title>NodeJs essentials</title>
          </head>
        <body>
          <h1>Hello world!</h1>
          <div id="results">
            <h3>search results:</h3>
            ${dynamicContent}</div>
          <form action='' method="POST">
            <label for="search">search</label>
            <input id="search" name="search"/>
            <button type="submit">search</button>
          </form>
        </body>
        </html>
      `)
      res.end()
    })
  } else if (home_url && post_method) {
    let data = ""
    req.on("data", (body) => {
      data += body
    })
    req.on("end", () => {
      /** to show submitted data as JSON.stringify */
      const converted = qs.parse(data)
      // const stringified = JSON.stringify({ submitted_name: converted.search })
      // res.setHeader("Content-Type", "application/json")
      // res.statusCode = 302
      // res.write(stringified)

      fs.appendFile("db.txt", "\n" + converted.search, () => {
        res.writeHead(302, { location: "/" })
        res.end()
      })

      /** Redirect to main route */
      // res.setHeader("Location", "/")
      // res.statusCode = 302

      /** In short hand redirection */
      // res.writeHead(302, { location: "/" })

      // res.end()
    })
  } else {
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify({ message: "page not found", status: "404" }))
    res.end()
  }
})

server.listen(3003, "127.0.0.1", () => {
  console.log("server is listening on localhost:3003")
})
