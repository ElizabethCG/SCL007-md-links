

const fs = require('fs');
const path = require('path');
const https = require('https');
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();


const getCommandInPosition = (pos) => {
  return (process.argv[pos]);
}

const commandToAdd1 = getCommandInPosition(2);
const commandToAdd2 = getCommandInPosition(3);


if (require.main === module) {
  mdLinks(commandToAdd1,commandToAdd2);   // this module was run directly from the command line as in node xxx.js
}

     // this module was not run directly from the command line and probably loaded by something else





function mdLinks(urlpath, evalOption){
return new Promise((resolve, reject) => {

let directoryPath = [commandToAdd1];
var linksFound = [];
var options=evalOption;

reviewFolders(directoryPath);
resolve(console.log(linksFound + " resultado esperado"));


///////////////////////


function validateFileOrDirectory(pathSearched) {

  pathSearched2 = pathSearched;
  isFolder = (fs.lstatSync(pathSearched2).isDirectory());
  isFile = (fs.lstatSync(pathSearched2).isFile());

  if (isFolder) { return 1 };
  if (isFile) { return 2 };
  return 0;

}





function reviewFolders(directoryPath) {
  let pathSearched = directoryPath[0];
  let folderOrFile = validateFileOrDirectory(pathSearched);
  let reviewPath = path.parse(pathSearched);
  if (folderOrFile === 2 && reviewPath.ext === ".md") {
    let readingResult = readFileMd(pathSearched);
    // console.log("llamar función que busca links en archivo md.")
  } else if (folderOrFile === 1) {
    var resultFolders = readContentDirectory(pathSearched, directoryPath)
  }
  // console.log(resultFolders);
  directoryPath.shift();
  // console.log(directoryPath + "resultado despues de shift");
  if (directoryPath.length < 1) { return console.log("proceso terminado") };
    // console.log(linksFound);
  return reviewFolders(directoryPath);
}


// reviewFolders(directoryPath);
// console.log(linksFound + " afuera del ciclo");


function readContentDirectory(pathSearched, directoryPath) {
  let data = fs.readdirSync(pathSearched);
  for (let i = 0; i < data.length; i++) {
    let urlPrueba = pathSearched + '/' + data[i];
    let folderOrFile = validateFileOrDirectory(urlPrueba);
    if (folderOrFile === 1) {
      directoryPath.push(urlPrueba);
    }
    reviewPath = path.parse(urlPrueba);
    if (folderOrFile === 2 && reviewPath.ext === ".md") {
      let readingResult = readFileMd(urlPrueba);
      // console.log("si archivo es . md entonces llamar función que lee md y saca links")
      //
      // console.log(reviewPath.ext);
      // console.log(linksFound + " en readContenDirectory");
    }
  }
  return directoryPath, linksFound;
}




// PARA LEER ARCHIVO Y ACUMULAR LINKS EN UN ARRAY
function readFileMd(urlFileMd) {
  commandToAdd3 = urlFileMd;
  let pathFileMd = commandToAdd3;
  // console.log(urlFileMd + " urlFileMd url que entra para búsqueda");
  // console.log(linksFound + " en linksFound");
  var result1 = fs.readFileSync(commandToAdd3);
  var result = md.render(result1.toString());


  // console.log(result.length);

  let link = "";
  let newText = result;

  // console.log(pathFileMd + " pathFileMd");

  let m = -1;

  do {
    newText.indexOf("<a href=");
    m = newText.indexOf("<a href=");
    let n = newText.indexOf("a>");
    let extensionString = (n + 2) - m;
    link = newText.substr(m, extensionString);
    let o = link.indexOf(">") + 1;
    let extensionContent = link.length - o - 4;
    let contentLink = link.substr(o, extensionContent);
    if (m != -1) { linksFound.push(link, contentLink, pathFileMd); }
    newText = newText.substr(n + 3);
  } while (m != -1);
  return linksFound;
}
});// FIN PROMESA
}
// FIN MDLINKS



module.exports= mdLinks;


////////////////////////////////////////
var fetchUrl = require("fetch").fetchUrl;

// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl("http://es.wikipedia.org/wiki/Markdown", function (error, meta, body) {
  if (meta.status === 200) {
    console.log("vinculo correcto");
    // console.log(meta.status);
    // console.log(meta.responseHeaders);
    // console.log(body);

  } else { console.log("vinculo incorrecto") }

});

// SOLO RECIBE HTTPS
https.get('https://es.wikipedia.org/wiki/Markdown', (res) => {
  const { statusCode } = res;
  // console.log(statusCode);
  const contentType = res.headers['content-type'];
  // console.log("estoy aqui " + contentType);
});
