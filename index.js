

const fs = require('fs');
const path = require('path');
const https = require('https');
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();


const getCommandInPosition = (pos) => {
  return (process.argv[pos]);
}

const pathToSearch = getCommandInPosition(2);
const optionsToEval = getCommandInPosition(3);


if (require.main === module) {
  mdLinks(pathToSearch, optionsToEval);
}



function mdLinks(filePath, evalOption) {
  return new Promise((resolve, reject) => {

    let directoryPath = [filePath];
    let linksFound = [];
    let options = evalOption;

    reviewFolders();
    resolve(console.log(linksFound));



    //FUNCIÓN PRINCIPAL DENTRO DE mdLinks()
    function reviewFolders() {
      let pathSearched = directoryPath[0];
      let isFolderOrFile = validateIsFileOrDirectory(pathSearched);
      let reviewPath = path.parse(pathSearched);
      //isFolderOrFile===1; es carpeta
      //isFolderOrFile===2; es archivo
      if (isFolderOrFile === 2 && reviewPath.ext === ".md") {
        let readingResult = readFileMd(pathSearched);
      } else if (isFolderOrFile === 1) {
        var resultFolders = readDirectoryContent(pathSearched)
      }
      directoryPath.shift(); //Elimina el 1° registro del array porque ya fue analizado. El nuevo contenido hallado se agregó al final del array para su revisión.
      if (directoryPath.length < 1) { return }; // Si la extensión del array es cero, significa que ya se analizó todo y no quedan más archivos ni carpetas por verificar.
      return reviewFolders(); // Si la ejecución llega a esta línea es porque aún quedan archivos y/o carpetas que revisar. La función se invoca a sí misma para repetir el ciclo de revisión.
    }


    //FUNCIÓN QUE EVALUA SI EL PATH ENTREGADO ES UNA CARPETA O UN ARCHIVO
    function validateIsFileOrDirectory(pathSearched) {
      isFolder = (fs.lstatSync(pathSearched).isDirectory());
      isFile = (fs.lstatSync(pathSearched).isFile());
      if (isFolder) { return 1 };
      if (isFile) { return 2 };
      return 0;
    }


    //FUNCIÓN QUE AGREGA EL CONTENIDO DE LA CARPETA DETECTADA AL ARRAY "directoryPath[]"
    function readDirectoryContent(pathSearched) {
      let directoryContent = fs.readdirSync(pathSearched);
      for (let i = 0; i < directoryContent.length; i++) {
        let directoryContentPath = pathSearched + '/' + directoryContent[i];
        directoryPath.push(directoryContentPath);
      }
      return;
    }




    // FUNCION QUE LEE EL CONTENIDO DEL ARCHIVO .MD Y ACUMULA LINKS HALLADOS EN ARRAY "linksFound[]"
    function readFileMd(pathFileMdSearched) {
      let pathFileMd = pathFileMdSearched;
      let result1 = fs.readFileSync(pathFileMd);
      let result = md.render(result1.toString());
      let link = "";
      let newText = result;
      let m = -1;

      do {
        // newText.indexOf("<a href=");
        stringSearched=(`<a href="`);
        m = parseInt(newText.indexOf(stringSearched));
        let n = newText.indexOf("a>");
        let extensionString = (n + 2) - m;
        link = newText.substr(m, extensionString);
        let o = link.indexOf(">") + 1;
        let extensionContent = link.length - o - 4;
        let contentLink = link.substr(o, extensionContent);
        if (m != -1) { linksFound.push({"href":link, "text":contentLink, "file": pathFileMd}); }
        newText = newText.substr(n + 3);
      } while (m != -1);
      return;
    }


  });// FIN PROMESA
}  // FIN MDLINKS


module.exports = mdLinks;
