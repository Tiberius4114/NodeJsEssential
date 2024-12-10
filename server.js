const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {
  const addPrefixToPath = (url) => {
    if (!url.startsWith("/web")) {
      return `web\\${url}`
    } else {
      return url
    }
  }
  let req_url = req.url
  let base_path = process.cwd()
  let file_path = path.join(base_path, addPrefixToPath(req_url))
  let stat

  try {
    stat = fs.lstatSync(file_path)
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/html" })
    res.write("not found!")
    res.end()
    return
  }

  if (stat.isFile()) {
    fs.readFile(file_path, (err, data) => {
      // res.writeHead(200, { "Content-Type": "text/html" })
      res.write(data)
      res.end()
    })
  } else if (stat.isDirectory()) {
    let reqUrl = req.url
    if (!reqUrl.endsWith("/") && reqUrl !== "/") {
      reqUrl += "/"
    }

    // console.log(reqUrl.endsWith("/"), reqUrl, "endsWith")

    res.writeHead(302, { location: reqUrl + "index.html" })
    res.end()
  } else {
    res.writeHead(500, { "Content-type": "text/html" })
    res.write("internal error")
    res.end()
  }
})
server.listen(3011, "127.0.0.1", () => {
  console.log("server is starting")
})
