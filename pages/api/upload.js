
import multiparty from "multiparty";

export default async function handle(req, res){
    if (req.method === 'POST') {
        const form = new multiparty.Form();
        const {fields, files} = await new Promise((resolve, reject)=>{
            form.parse(req, (err, fields, files) =>{
                if(err) reject(err);
                resolve({fields, files});
            });
        });
        console.log("Length: ",files.length);
            console.log(fields);
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

export const config = {
    api: {bodyParser: false},
};