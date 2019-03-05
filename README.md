# Markdown-Links

### JavaScript API

El módulo ofrece la siguiente interfaz:

#### `mdLinks(path)`

##### Argumentos

- `path`: Ruta absoluta.


##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelva a un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo de uso

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);


mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

Para ejecutar a manera a través de la terminal:

`md-links <path-to-file>`




## Para instalarhttps

Módulo instalable via `npm install <https://github.com/ElizabethCG/SCL007-md-links.git>`.
