import request from 'supertest';
import app from '../index';
import * as productImageService from '../services/imageService';
import fs from 'fs';
import { getImage } from './imageController';

jest.mock('fs');
jest.mock('path');
jest.mock('../services/productImageService');

let server: any;

const res: any = {
  sendFile: jest.fn()
};

beforeAll(() => {
  server = app.listen(3003);
});

afterAll(() => {
  server.close();
});

describe('ProductImageController', () => {
  describe('createProductImage', () => {
    it('should return 400 if no file is uploaded', async () => {
      const response = await request(app)
        .post('/product-image/1')
        .attach('image', '');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Nenhum arquivo foi enviado.');
    });

    it('should return 201 and create a product image', async () => {
      const mockFileBuffer = Buffer.from('mock data');
      const mockFileName = 'image.png';
      const mockMimeType = 'image/png';

      (fs.readFileSync as jest.Mock).mockReturnValue(mockFileBuffer);
      (fs.writeFile as unknown as jest.Mock).mockImplementation((path, data, callback) => callback(null));
      (productImageService.createProductImageService as jest.Mock).mockResolvedValue({
        id: 1,
        productId: 1,
        filename: mockFileName,
        path: '/mock/path/image.png',
      });

      const response = await request(app)
        .post('/product-image/1')
        .attach('image', mockFileBuffer, { filename: mockFileName, contentType: mockMimeType });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        productId: 1,
        filename: mockFileName,
        path: '/mock/path/image.png',
      });
    });
  });

  describe('getProductImageDetails', () => {
    it('should return 200 and product image details', async () => {
      jest.spyOn(productImageService, 'getImagesByproductId').mockResolvedValueOnce([{ id: '1', productId: 1, filename: 'image.png', path: '/mock/path/image.png' }]);

      const response = await request(app).get('/product-image/images/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: '1', productId: 1, filename: 'image.png', path: '/mock/path/image.png' }]);
    });

    it('should return 200 and an empty list if no product images are found', async () => {
      jest.spyOn(productImageService, 'getImagesByproductId').mockResolvedValueOnce([]);

      const response = await request(app).get('/product-image/images/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('getImage', () => {
    it('should return 404 if product image is not found', async () => {
      jest.spyOn(productImageService, 'getProductImage').mockResolvedValueOnce(null);

      const response = await request(app).get('/product-image/1');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Imagem do produto não encontrada');
    });

    it('should return the image file if found', async () => {
      const mockImage = {
        id: '1',
        productId: 1,
        filename: 'image.png',
        path: '/mock/path/image.png',
      };
      jest.spyOn(productImageService, 'getProductImage').mockResolvedValueOnce(mockImage);

      const mockSendFile = jest.fn();
      const mockRes = { sendFile: mockSendFile };

      const req = { params: { id: '1' } };

      await getImage(req as any, mockRes as any);

      expect(mockSendFile).toHaveBeenCalledWith(mockImage.path);
    });
  });
});