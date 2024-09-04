import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import axios from "axios";

dotenv.config();

const router = Router();

router.route('/').get((req, res) => {
    res.send('Hello');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const payload = {
            prompt: prompt,
            output_format: "webp"
        };

        const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
            axios.toFormData(payload, new FormData()),
            {
              validateStatus: undefined,
              responseType: "arraybuffer",
              headers: { 
                Authorization: `Bearer ${process.env.API_TOKEN}`, 
                Accept: "image/*" 
              },
            },
        );

        if (response.status === 200) {
            const base64Image = Buffer.from(response.data).toString('base64');
            res.json({ photo: base64Image });
        } else {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.toString());
    }
});

export default router;
