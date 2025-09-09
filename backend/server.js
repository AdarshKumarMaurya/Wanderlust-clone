const express=require("express");
const mongoose=require("mongoose");
const app=express();
const listingRoute=require("./routers/listing-router");
const cors=require("cors");

// let's tackle cors

const corsOptions={
        origin:"http://localhost:5173",
        method:"GET,POST,PUT,DELETE,PATCH,HEAD",
        Credentials:true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/listing",listingRoute);

const MONGO_URL = "mongodb+srv://adarsh63930:Adarsh63930@zerodhaclonecluster.puse4jx.mongodb.net/airbnd?retryWrites=true&w=majority&appName=ZerodhaCloneCluster";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


app.route("/").get((req,res)=>{
    res.status(200).send("<h1>Jaygurudev nam prabhu ka..</h1>");
});
app.listen(8080,()=>{
    console.log("connected..");
})