const express = require('express');

const app = express();
const PORT=3000;

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/frontend.html');
})

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});