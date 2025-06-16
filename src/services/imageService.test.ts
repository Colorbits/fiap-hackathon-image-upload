import { createProductImageService, getImagesByproductId, getProductImage } from './imageService';
import { mockReset } from 'jest-mock-extended';
import prismaMock from '../client';

jest.mock('../client', () => {
  const { mockDeep } = require('jest-mock-extended');
  return {
    __esModule: true,
    default: mockDeep(), // Remove os argumentos de tipo
  };
});

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.requireActual('jest-mock-extended').mockDeep,
}));

beforeEach(() => {
  mockReset(prismaMock);
});

describe('createProductImageService', () => {
  it('should create a product image', async () => {
    const productImageDto = {
      productId: 1,
      filename: 'image.png',
      path: '/uploads/image.png',
    };

    prismaMock.productImage.create = jest.fn().mockResolvedValue({
      id: '1',
      productId: 1,
      filename: 'image.png',
      path: '/uploads/image.png',
    });

    const result = await createProductImageService(productImageDto);

    expect(prismaMock.productImage.create).toHaveBeenCalledWith({
      data: productImageDto,
    });
    expect(result).toEqual({ id: '1', ...productImageDto });
  });
});

describe('getImagesByproductId', () => {
  it('should return images for a given productId', async () => {
    const productId = '1';
    const images = [
      { id: '1', productId: 1, filename: 'image1.png', path: '/uploads/image1.png' },
      { id: '2', productId: 1, filename: 'image2.png', path: '/uploads/image2.png' },
    ];

    prismaMock.productImage.findMany = jest.fn().mockResolvedValue([
      { id: '1', productId: 1, filename: 'image1.png', path: '/uploads/image1.png' },
      { id: '2', productId: 1, filename: 'image2.png', path: '/uploads/image2.png' },
    ]);

    const result = await getImagesByproductId(productId);
    const resolvedResult = await result; // Aguarda a resolução da promessa

    expect(prismaMock.productImage.findMany).toHaveBeenCalledWith({
      where: { productId: Number(productId) },
    });
    expect(resolvedResult).toEqual(images);
  });
});

describe('getProductImage', () => {
  it('should return a product image by id', async () => {
    const id = '1';
    const image = { id: '1', productId: 1, filename: 'image.png', path: '/uploads/image.png' };

    prismaMock.productImage.findFirst = jest.fn().mockResolvedValue({
      id: '1',
      productId: 1,
      filename: 'image.png',
      path: '/uploads/image.png',
    });

    const result = await getProductImage(id);
    const resolvedResult = await result; // Aguarda a resolução da promessa

    expect(prismaMock.productImage.findFirst).toHaveBeenCalledWith({
      where: { id },
    });
    expect(resolvedResult).toEqual(image);
  });
});