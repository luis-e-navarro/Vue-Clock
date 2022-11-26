import app from './appServer.js'
const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server listening to PORT: ${PORT}...`);
});

