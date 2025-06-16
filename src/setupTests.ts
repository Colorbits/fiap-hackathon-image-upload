import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

const prismaMock = mockDeep<PrismaClient>();

jest.mock('./client', () => ({
  __esModule: true,
  default: prismaMock,
}));