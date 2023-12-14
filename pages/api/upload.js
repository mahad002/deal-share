
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multiparty from "multiparty";
import fs from 'fs';
import mime from 'mime-types';

export default async function handle(req, res){
    if (req.method === 'POST') {
        const form = new multiparty.Form();
        const {fields, files} = await new Promise((resolve, reject)=>{
            form.parse(req, (err, fields, files) =>{
                if(err) reject(err);
                resolve({fields, files});
            });
        });
        console.log("Length: ",files.file);
        console.log("Files: ",files.file);
        console.log("Fields: ",fields);
        const client = new S3Client({
            region: 'ap-south-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        const links = [];
        for(const file of files.file){
            const ext = file.originalFilename.split('.').pop();
            const newFilename = Date.now() + '.' + ext;
            console.log({ext,file});
            await client.send(new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: newFilename,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path),
                // Key: files.file[0].originalFilename,
                // Body: files.file[0].path,
            }));
            const link = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${newFilename}`;
            links.push(link);
        }

        return res.json({links});
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

export const config = {
    api: {bodyParser: false},
};