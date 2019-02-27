

const fs   = require('fs');
const path = require('path');
const https = require('https');
const MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();




const getCommandInPosition = (pos) => {
	return (process.argv[pos]);
}

const commandToAdd1 = getCommandInPosition(2);
const commandToAdd2 = getCommandInPosition(3);
console.log(("Resultado > ")+ (commandToAdd1)+" "+(commandToAdd2));

let directoryPath=[];
let a=1;
while(a>0){
  reviewPath=path.parse(commandToAdd1);
  console.log(reviewPath.ext);
  console.log(reviewPath.root);
  console.log(reviewPath.base);
  console.log(reviewPath.name);

  console.log(reviewPath.dir);

  path.dirname(commandToAdd1);
  console.log(path.dirname(commandToAdd1)+"dirname");



fs.readdir(commandToAdd1, (err, data) => {
  if (err) throw err;
  console.log(data);

  console.log(path.extname(data[6])+"hola");

  for (let i=0; i<data.length; i++){
  	// if(data[i].substring(data[i].length-2)==="md" ){console.log("hay un archivo md")}else{console.log("no hay")};}
// console.log(data.withFileTypes());
//
//     console.log(data[i].fs.isDirectory());
    if(path.extname(data[i])!=""){console.log("no es carpeta");
    if(path.extname(data[i])===".md"){
    console.log("es archivo md... llamar función")
    };
    // console.log(fs.stat());

     // fs.Dirent(commandToAdd1);


    }else{console.log("es carpeta... analizando cada archivo encontrado y carpeta")}
}

  });

// XQUE CONFUNDE EL DIRECTORIO CON ARCHIVO?
  // Reads contents of directory `/some/dir`, providing an `Array` of
  // `fs.Dirent` objects (`entries`)
  fs.readdir(commandToAdd1, { withFileTypes: true }, (err, entries) => {
    if (err) throw err;
    entries.filter((entry) => entry.isDirectory())
      .forEach((entry) => {
        console.log(`${entry.name} is a directory`);
      });
  });

  // const fs = require("fs");
  //
  // let path = "/path/to/something";

  fs.lstat('C:/Users/Elizabeth/Documents/javascript/markdown/SCL007-md-links', (err, stats) => {

      if(err){
          return console.log(err); //Handle error
}else{
      console.log(`Is file: ${stats.isFile()}`);
      console.log(`Is directory: ${stats.isDirectory()}`);

      if(stats.isFile()){console.log("es archivo")} else if (stats.isDirectory()){console.log("es directorio");

     directoryPath.push(commandToAdd1);
     console.log(directoryPath);


    }


}

});

// console.log(directoryPath);



a=0;
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


let linksFound=[];
let link="";
let newText=result;
let path=commandToAdd1+"/"+commandToAdd3;
let m=-1;

do{
    newText.indexOf("<a href=");
    m=newText.indexOf("<a href=");
    let n=newText.indexOf("a>");
    let extensionString=(n+2)-m;

    link=newText.substr(m,extensionString);


    let o=link.indexOf(">")+1;

    let extensionContent=link.length-o-4;
    let contentLink=link.substr(o,extensionContent);

    if(m!=-1){linksFound.push(link,contentLink,path);}

    newText=newText.substr(n+3);
} while (m!=-1);

// console.log(linksFound);


});

// PARA IDENTIFICAR LINKS VALIDOS
var fetchUrl = require("fetch").fetchUrl;

// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl("http://es.wikipedia.org/wiki/Markdown", function(error, meta, body){
  if(meta.status===200){console.log("vinculo correcto");
  console.log(meta.status);
  console.log(meta.responseHeaders);
  console.log(body);

}else{console.log("vinculo incorrecto")}
    // console.log(meta.status);
    // console.log(meta.responseHeaders);
    // console.log(body);
});

// SOLO RECIBE HTTPS
https.get('https://es.wikipedia.org/wiki/Markdown', (res) => {
  const { statusCode } = res;
  console.log(statusCode);
  const contentType = res.headers['content-type'];
  console.log("estoy aqui "+contentType);
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
