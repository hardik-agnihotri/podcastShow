import express from 'express';
import { addPodcast, getPodcasts, userPodcasts, getPodcastById , getPodcastCat } from '../controller/podcastController.js';
import middleware from '../middleWare/middleWare.js';
import upload from '../middleWare/multer.js';

const router = express.Router();

router.post('/addpodcast', middleware,upload,addPodcast);
router.get("/get-podcasts",getPodcasts)
router.get("/get-user-podcasts",middleware,userPodcasts)
router.get("/get-podcasts/:id",getPodcastById)
router.get("/category/:cat",getPodcastCat)

export default router;