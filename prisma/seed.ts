import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding roles...');

  const roles = ['ADMIN', 'USER', 'PHARMACY'];

  for (const roleName of roles) {
    await prisma.user_role.upsert({
      where: { roleName },
      update: {},
      create: { roleName },
    });
  }

  console.log('✅ Roles seeded');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
