import { mongooseConnect } from "../lib/mongoose";
import { Request } from "../../models/request";

export default async function handle(req, res) {
    const { method } = req;

    try {
        await mongooseConnect();
        // const session = await getServerSession(req, res, authConf);

        if (method === 'POST') {
            const { title, description, product, to,  from, quantity, approved, rejected } = req.body;
            const requestDoc = await Request.create({
                title,
                description,
                product,
                to,
                from,
                quantity,
                approved,
                rejected,
            });
            res.status(201).json(requestDoc);
        }

        if (method === 'GET') {
            console.log("123");
        
            try {
                if (req.query?.id) {
                    console.log("Fetching request by ID");
                    const request = await Request.find({ _id: req.query.id });
                    console.log("Request:", request);
                    
                    if (!request) {
                        return res.status(404).json({ error: 'Request not found' });
                    }
        
                    res.json(request);
                } else if (req.query?.userTo) {
                    console.log("Fetching requests by userTo");
                    const requestsTo = await Request.find({ to: req.query.userTo });
                    console.log("Requests:", requestsTo);
                    
                    res.json(requestsTo);
                } else if (req.query?.userFrom) {
                    console.log("Fetching requests by userFrom");
                    const requestsFrom = await Request.find({ from: req.query.userFrom });
                    console.log("Requests:", requestsFrom);
                    
                    res.json(requestsFrom);
                } else {
                    console.log("Fetching all requests");
                    const requests = await Request.find({});
                    console.log("Requests:", requests);
                    
                    res.json(requests);
                }
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
        

        if (method === 'PUT') {
            const { title, description, product, to,  from, quantity, approved, rejected, _id } = req.body;
            const updatedRequest = await Request.findByIdAndUpdate(
                _id,
                { title, description, product, to,  from, quantity, approved, },
                { new: true }
            );
            if (!updatedRequest) {
                return res.status(404).json({ error: 'Request not found' });
            }
            res.json(updatedRequest);
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                const deletedRequest = await Request.findByIdAndDelete(req.query?.id);
                if (!deletedRequest) {
                    return res.status(404).json({ error: 'Request not found' });
                }
                res.json(true);
            }
        }
    } catch (error) {
        console.error('Error in request.js:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
