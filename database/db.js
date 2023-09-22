import mongoose from "mongoose";

async function connect() {
    mongoose.connect('mongodb+srv://tanmaymeshram883:iRgF6VS4NmtQKdCH@cluster0.uwqnrri.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log('Connected!!');
    })
    .catch((error)=>{
        console.log(error);
    })
}

export default connect;