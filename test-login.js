const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function check() {
  const users = await prisma.user.findMany({
    where: { email: { startsWith: 'test-' } },
    orderBy: { id: 'desc' },
    take: 1
  });
  
  if (users.length === 0) {
    console.log("No test users found!");
    process.exit(1);
  }
  
  const user = users[0];
  console.log("Found registered user:", user.email, user.role);
  
  const isMatch = await bcrypt.compare('password123', user.passwordHash);
  console.log("Password hash match:", isMatch);
}

check().catch(console.error).finally(() => prisma.$disconnect());
