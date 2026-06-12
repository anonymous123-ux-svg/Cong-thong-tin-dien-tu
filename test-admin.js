const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function check() {
  const admin = await prisma.user.findUnique({ where: { email: 'admin@elearning.com' } });
  if (admin) {
    const isMatch = await bcrypt.compare('password123', admin.passwordHash);
    console.log("Admin password hash match password123:", isMatch);
    if (!isMatch) {
       console.log("Hash in DB:", admin.passwordHash);
    }
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
