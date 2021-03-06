# HotTab Print Server v2

Local Server to receive data from POS client then send the PDF files to the physical (thermal) printers to print out the receipts.

## Technology

- NodeJS (Express)
- Sumatra.exe (command line interface for printing)

## Instalation

### Install dependencies

```
$ npm install
```

### Run

```
$ node server.js
```
or setup as a Windows service using [Quick Windows Service](https://github.com/tallesl/qckwinsvc)


## Document generator
Using [apiDoc](https://github.com/apidoc/apidoc) to generate the document page.

### Install the library

```
$ npm install apidoc -g
```

### Generate the docs from write_docs/apidoc.json

```
$ apidoc -i doc_src/ -o doc/
```
