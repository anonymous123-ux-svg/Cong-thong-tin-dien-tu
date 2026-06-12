const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function list() {
  const users = await prisma.user.findMany({ select: { email: true, role: true } });
  console.log(users);
}
list().catch(console.error).finally(() => prisma.$disconnect());
