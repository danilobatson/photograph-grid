import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageType } from '../index';

type ResponseData = {
  error: string;
};

const images: ImageType[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageType | ResponseData | ImageType[]>
) {
  try {
    if (req.method === 'GET') {
      console.log('Get Request');
      res.status(200).json(images);
      return;
    }
    if (req.method === 'POST') {
      const { newImage } = req.body;
      const imageToPush: ImageType = {
        newId: newImage.newId,
        imageSrc: newImage.imageSrc,
        photoName: newImage.photoName,
      };
      images.push(imageToPush);
      res.status(201).json(imageToPush);
      return;
    }
  } catch (err) {
    res.status(405).send({ error: 'Method Not Allowed' });
  }
}
