const express = require("express")
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require("./routes"));
app.listen(PORT,()=>{
    console.log(`Server is listen on port : ${PORT}`);
})