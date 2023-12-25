import { Router } from 'express';
import { Store, User } from '../../models/store';
import { Product } from "@/models/product";
import { mongooseConnect } from "../lib/mongoose";
import { getServerSession } from 'next-auth';
import { authConf } from './auth/[...nextauth]';
export default async function handle(req, res) {
    const { method } = req;
    
    try {
        await mongooseConnect();
        const session = await getServerSession(req,res,authConf);
        console.log("Sesssion: ", session);
        const user1 = session.user;
        console.log("User: ", user1);
        const {name, email, image } = user1;

        if (method === 'POST') {
            console.log("I'm here")
            console.log("post", req.body);
            const { store, description, bannerImage, storeImage, isAdmin } = req.body;
            const userDoc = await Store.create({
                name,
                email,
                image,
                store,
                description,
                bannerImage,
                storeImage,
                isAdmin
            });
            res.json(userDoc);
        }

        if (method === 'GET') {
            console.log("Im here");
            console.log(email);
            const user = await Store.findOne({ email: email });

            console.log("user: ", user);

            if (!user) {
                return res.json(false);
            }
            res.json(user);
        }

        if (method === 'PUT') {
            console.log("hehe")
            const {store, description, bannerImage, storeImage, isAdmin, _id } = req.body;
            console.log("hehe", _id)
            const updatedUser = await Store.findByIdAndUpdate(
                _id,
                { name, email, image, store, description, bannerImage, storeImage, isAdmin },
                { new: true }
            );
            console.log("hehe")
            if (!updatedUser) {
                console.log("Updated User: ", updatedUser)
                return res.status(404).json({ error: 'User not found' });
            }
            console.log("hehe")
            res.json(updatedUser);
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                const deletedUser = await User.findByIdAndDelete(req.query?.id);
                if (!deletedUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(true);
            }
        }
    } catch (error) {
        console.error('Error in products.js:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
