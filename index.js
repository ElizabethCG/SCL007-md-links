

const fs   = require('fs');
const path = require('path');

const MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();




const getCommandInPosition = (pos) => {
	return (process.argv[pos]);
}

const commandToAdd1 = getCommandInPosition(2);
const commandToAdd2 = getCommandInPosition(3);

// path.parse(path)
reviewPath=path.parse(commandToAdd1);
console.log(reviewPath.ext);
console.log(reviewPath.root);
console.log(reviewPath.base);
console.log(reviewPath.name);

console.log(reviewPath.dir);

path.dirname(commandToAdd1);
console.log(path.dirname(commandToAdd1)+"dirname");

if(reviewPath.ext!=""){console.log("no es carpeta");
if(reviewPath.ext="md"){
console.log("es archivo md... llamar función")
};

}else{console.log("es carpeta... analizar cada archivo encontrado y carpeta")}


// let totalSum = 0;
// for(let i = 0; i < commandToAdd1; ++i){
// 	totalSum += getNumberInPosition(3+i);
// }

console.log(("Resultado > ")+ (commandToAdd1)+" "+(commandToAdd2));

// Formato
 //fs.readdir(path[, options], callback)

fs.readdir(commandToAdd1, (err, data) => {
  if (err) throw err;
  console.log(data);
	// });


console.log(path.extname(data[3]));

// console.log(data[3].substring(data[3].length-2)); TOMA LA EXTENSIÓN
// console.log(path.extname(data[3]);

for (let i=0; i<data.length; i++){
	if(data[i].substring(data[i].length-2)==="md" ){console.log("hay un archivo md")}else{console.log("no hay")};}

});

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

// array.indexOf(searchElement[, fromIndex])
// cadena.substr(1))
