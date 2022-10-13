const minimist = require("minimist");
const http = require("http");
const fs = require("fs");
const readline = require("readline");

let homeContent = "";
let projectContent = "";
let styleContent = "";
let jsContent = "";
let formContent = "";
let picContent = "";

let args = minimist(process.argv.slice(2), {
  default: {
    port: "3000",
  },
});
let port = args["port"];

fs.readFile("home.html", function (err, home) {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", function (err, project) {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("style.css", function (err, styles) {
  if (err) {
    throw err;
  }
  styleContent = styles;
});

fs.readFile("main.js", function (err, js) {
  if (err) {
    throw err;
  }
  jsContent = js;
});

fs.readFile("registration.html", function (err, form) {
  if (err) {
    throw err;
  }
  formContent = form;
});

fs.readFile("reg-photo.jpg", function (err, pic) {
  if (err) {
    throw err;
  }
  picContent = pic;
});

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// lineDetail.question(
//   `File path for registration form (registration.html) - `,
//   (path) => {
//     fs.readFile(path, function (err, form) {
//       if (err) throw err;
//       formContent = form;
//     });
//     lineDetail.close();
http
  .createServer(function (request, response) {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/main.js":
        response.write(jsContent);
        response.end();
        break;
      case "/style.css":
        response.write(styleContent);
        response.end();
        break;
      case "/registration":
        response.write(formContent);
        response.end();
        break;
      case "/reg-photo.jpg":
        response.writeHead(200, { "Content-type": "image/jpg" });
        // response.write(formContent);
        response.end(picContent);
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port);
//   }
// );
