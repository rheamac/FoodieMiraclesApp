REM -----install typescript, react, type definition files and others-------

npm install --save typescript
npm install --save react @types/react 
npm install --save react-dom @types/react-dom
npm install --save typescript awesome-typescript-loader source-map-loader 
typings install dt~react dt~react-dom -–save
npm install   
npm link typescript  