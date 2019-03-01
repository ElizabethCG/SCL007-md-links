

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


let directoryPath = [commandToAdd1];
// console.log(directoryPath[0]);
// let a=1;
// while(a>0){
// reviewPath = path.parse(commandToAdd1);
// console.log(reviewPath);
// console.log(reviewPath.ext);
// console.log(reviewPath.root);
// console.log(reviewPath.base);
// console.log(reviewPath.name);
//
// console.log(reviewPath.dir);
//
// path.dirname(commandToAdd1);
// console.log(path.dirname(commandToAdd1) + " Nombre directorio ");

// var directoryPath=[commandToAdd1];

// console.log(directoryPath[0] + " revisando si directory path contiene algo");
// console.log(`${directoryPath[0]} hola`);


///////////////////////


function validateFileOrDirectory(pathSearched){
  // console.log (pathSearched+" en validateFileOrDirectory");
 pathSearched2=pathSearched;
 // console.log(pathSearched2+" revisando pathsearched 2");

 // try{
  isFolder=(fs.lstatSync(pathSearched2).isDirectory());
  isFile=(fs.lstatSync(pathSearched2).isFile());
 // }catch(e){
 //    // Handle error
 //  console.log("error"+e);
 // }


if(isFolder){return 1};
if(isFile){return 2};
return 0;

//   fs.lstat(pathSearched2,(err, stats) => {
//     if (err) {
//       return console.log(err); //Handle error
//     }else if(stats.isFile()){
//  let reviewPath = path.parse(pathSearched2);
//  console.log(reviewPath + " reviewPath");
//  if(reviewPath.ext==="md"){return "md"};}
//
//  if(stats.isDirectory()){return "directory"}
//     // console.log(`Is file: ${stats.isFile()}`);
//     // console.log(`Is directory: ${stats.isDirectory()}`);
// console.log("hola estoy aquí en validateFileOrDirectory");
//
// });


}





function reviewFolders(directoryPath) {
  // console.log(directoryPath[0] + " primera impresion dentro de la función"); ASÍ NO LO ENTIENDE HAY QUE PASARLO A UNA VARIABLE
  // console.log(commandToAdd1 + " primera impresion commandToAdd1");
console.log(directoryPath);
let pathSearched=directoryPath[0];
 // console.log(pathSearched+ " pathSearched");

 let folderOrFile = validateFileOrDirectory(pathSearched);

 // console.log(folderOrFile+" FolderOrFile");

if(folderOrFile===1){
 var resultFolders=readContentDirectory(pathSearched,directoryPath)
 }
console.log(resultFolders);


  // fs.lstat(pathSearched, (err, stats) => {
  //
  //   if (err) {
  //     return console.log(err); //Handle error
  //   } else {
  //     console.log(`Is file: ${stats.isFile()}`);
  //     console.log(`Is directory: ${stats.isDirectory()}`);
  //
  //     if (stats.isFile()) { console.log("es archivo") } else if (stats.isDirectory()) {
  //       console.log("es directorio");

        // fs.readdir(pathSearched, (err, data) => {
        //   if (err) throw err;
        //   console.log(data);
        //   for (let i = 0; i < data.length; i++) {
        //     let urlPrueba = pathSearched + '/' + data[i];
        //     // console.log(urlPrueba);
        //     console.log(directoryPath);
        //     directoryPath.push(urlPrueba);
        //
        //   }


     directoryPath.shift();
          // console.log(directoryPath.length);
          // console.log(directoryPath);
          // if (directoryPath.length = 0) { return console.log("proceso terminado") };
          // return (reviewFolders(directoryPath));
        // });
        // console.log(directoryPath + " estoy fuera del ciclo readdir");
  //     }
  //     console.log(directoryPath + " estoy fuera del ciclo si es directorio");
  //   }
  //   console.log(directoryPath + " estoy fuera del ciclo si no es error entonces is es archivo o directorio");
  // });
console.log(directoryPath.length);
  console.log(directoryPath+"resultado despues de shift");
  if (directoryPath.length < 1) { return console.log("proceso terminado") };
  // newDirectoryPath=directoryPath;
  console.log(directoryPath.length);
  // console.log(newDirectoryPath+"resultado antes de volver a llamar");
  console.log(directoryPath[0]+"largo array final");
  return reviewFolders(directoryPath);
}

// console.log(directoryPath);



// a=0;
// }



reviewFolders(directoryPath);



function readContentDirectory(pathSearched,directoryPath){


  // fs.readdirSync(pathSearched, (err, data) => {
   let data = fs.readdirSync(pathSearched);
    // if (err) throw err;
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      let urlPrueba = pathSearched + '/' + data[i];
       // console.log(urlPrueba);
      // console.log(directoryPath);
      let folderOrFile = validateFileOrDirectory(urlPrueba);
     // console.log(folderOrFile);
      if(folderOrFile===1){
      directoryPath.push(urlPrueba);
    }
  }
  // console.log(directoryPath);
  return directoryPath;
// }
// )

}




// PARA LEER UN ARCHIVO
commandToAdd3 = '\README.md';
fs.readFile(commandToAdd3, (err, data) => {
  if (err) throw err;
  // console.log(data.toString());

  var result = md.render(data.toString());
  // para imprimir el contenido del archivo
  // console.log(result[46]);

  console.log(result.length);


  let linksFound = [];
  let link = "";
  let newText = result;
  let path = commandToAdd1 + "/" + commandToAdd3;
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

    if (m != -1) { linksFound.push(link, contentLink, path); }

    newText = newText.substr(n + 3);
  } while (m != -1);

  // console.log(linksFound);


});

// PARA IDENTIFICAR LINKS VALIDOS
var fetchUrl = require("fetch").fetchUrl;

// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl("http://es.wikipedia.org/wiki/Markdown", function (error, meta, body) {
  if (meta.status === 200) {
    console.log("vinculo correcto");
    console.log(meta.status);
    console.log(meta.responseHeaders);
    console.log(body);

  } else { console.log("vinculo incorrecto") }
  // console.log(meta.status);
  // console.log(meta.responseHeaders);
  // console.log(body);
});

// SOLO RECIBE HTTPS
https.get('https://es.wikipedia.org/wiki/Markdown', (res) => {
  const { statusCode } = res;
  console.log(statusCode);
  const contentType = res.headers['content-type'];
  console.log("estoy aqui " + contentType);
});




//SOLO RECORDATORIOS DE FORMATO Y FUNCIONES

// array.indexOf(searchElement[, fromIndex])
// cadena.substr(1))
// Formato
 //fs.readdir(path[, options], callback)

	// });

// console.log(data[3].substring(data[3].length-2)); TOMA LA EXTENSIÓN
// console.log(path.extname(data[3]);
// console.log(data[3].substring(data[3].length-2)); TOMA LA EXTENSIÓN
// console.log(path.extname(data[3]);

// fs.lstat('C:/Users/Elizabeth/Documents/javascript/markdown/SCL007-md-links/.gitignore', (err, stats) => {
//
//     if(err){
//         return console.log(err); //Handle error
// }else{
//     console.log(`Is file: ${stats.isFile()}`);
//     console.log(`Is directory: ${stats.isDirectory()}`);
//     // console.log(`Is symbolic link: ${stats.isSymbolicLink()}`);
//     // console.log(`Is FIFO: ${stats.isFIFO()}`);
//     // console.log(`Is socket: ${stats.isSocket()}`);
//     // console.log(`Is character device: ${stats.isCharacterDevice()}`);
//     // console.log(`Is block device: ${stats.isBlockDevice()}`);
//
//     if(stats.isFile()){console.log("es archivo")}
// }
//
//
// });
