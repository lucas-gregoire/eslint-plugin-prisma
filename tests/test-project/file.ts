// This file must compile otherwise tests will fail
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
prisma.client.findMany({
  where: { id: 1 },
  select: {
    id: true,
    name: true,
    invoices: true,
  },
});
