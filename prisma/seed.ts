import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.contentItemTag.deleteMany();
  await prisma.contentItem.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.client.deleteMany();

  const [website, instagram, telegram, linkedin] = await Promise.all([
    prisma.channel.create({
      data: {
        name: "Website",
        slug: "website",
        type: "WEBSITE",
      },
    }),
    prisma.channel.create({
      data: {
        name: "Instagram",
        slug: "instagram",
        type: "INSTAGRAM",
      },
    }),
    prisma.channel.create({
      data: {
        name: "Telegram",
        slug: "telegram",
        type: "TELEGRAM",
      },
    }),
    prisma.channel.create({
      data: {
        name: "LinkedIn",
        slug: "linkedin",
        type: "LINKEDIN",
      },
    }),
  ]);

  const [bariatricTag, seoTag, socialTag, reviewTag] = await Promise.all([
    prisma.tag.create({
      data: {
        name: "Bariatric",
        slug: "bariatric",
        color: "#0f766e",
      },
    }),
    prisma.tag.create({
      data: {
        name: "SEO",
        slug: "seo",
        color: "#2563eb",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Social",
        slug: "social",
        color: "#db2777",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Review",
        slug: "review",
        color: "#ca8a04",
      },
    }),
  ]);

  const heydari = await prisma.client.create({
    data: {
      name: "Dr. Mahmood Heydari",
      slug: "dr-mahmood-heydari",
      industry: "Healthcare",
      contactName: "Content Manager",
      status: "ACTIVE",
    },
  });

  const houseOfPaper = await prisma.client.create({
    data: {
      name: "House of Paper",
      slug: "house-of-paper",
      industry: "Ecommerce",
      contactName: "Marketing Lead",
      status: "ACTIVE",
    },
  });

  const bariatricCampaign = await prisma.campaign.create({
    data: {
      name: "Summer Bariatric Education",
      slug: "summer-bariatric-education",
      objective: "Increase patient education through website and social content.",
      status: "ACTIVE",
      startsAt: new Date("2026-06-01T00:00:00.000Z"),
      endsAt: new Date("2026-07-31T00:00:00.000Z"),
      clientId: heydari.id,
    },
  });

  const ecommerceCampaign = await prisma.campaign.create({
    data: {
      name: "Back to School Launch",
      slug: "back-to-school-launch",
      objective: "Prepare product content for seasonal stationery demand.",
      status: "PLANNED",
      startsAt: new Date("2026-07-10T00:00:00.000Z"),
      endsAt: new Date("2026-09-10T00:00:00.000Z"),
      clientId: houseOfPaper.id,
    },
  });

  const sleeveArticle = await prisma.contentItem.create({
    data: {
      title: "What to Eat After Sleeve Surgery",
      brief: "SEO article explaining safe food stages after sleeve surgery.",
      status: "REVIEW",
      priority: "HIGH",
      scheduledAt: new Date("2026-06-28T08:30:00.000Z"),
      clientId: heydari.id,
      campaignId: bariatricCampaign.id,
      channelId: website.id,
      tags: {
        create: [
          { tagId: bariatricTag.id },
          { tagId: seoTag.id },
          { tagId: reviewTag.id },
        ],
      },
    },
  });

  await prisma.contentItem.create({
    data: {
      title: "Instagram Carousel: Protein After Bariatric Surgery",
      brief: "Short educational carousel for post surgery nutrition.",
      status: "SCHEDULED",
      priority: "MEDIUM",
      scheduledAt: new Date("2026-06-29T15:00:00.000Z"),
      clientId: heydari.id,
      campaignId: bariatricCampaign.id,
      channelId: instagram.id,
      tags: {
        create: [
          { tagId: bariatricTag.id },
          { tagId: socialTag.id },
        ],
      },
    },
  });

  await prisma.contentItem.create({
    data: {
      title: "Telegram Post: Warning Signs After Surgery",
      brief: "Public friendly post about symptoms that need medical attention.",
      status: "DRAFT",
      priority: "URGENT",
      scheduledAt: new Date("2026-06-30T11:00:00.000Z"),
      clientId: heydari.id,
      campaignId: bariatricCampaign.id,
      channelId: telegram.id,
      tags: {
        create: [
          { tagId: bariatricTag.id },
          { tagId: socialTag.id },
        ],
      },
    },
  });

  await prisma.contentItem.create({
    data: {
      title: "Notebook Product Category Landing Page",
      brief: "SEO landing page for school notebooks and stationery products.",
      status: "IDEA",
      priority: "MEDIUM",
      scheduledAt: new Date("2026-07-12T09:00:00.000Z"),
      clientId: houseOfPaper.id,
      campaignId: ecommerceCampaign.id,
      channelId: website.id,
      tags: {
        create: [
          { tagId: seoTag.id },
        ],
      },
    },
  });

  await prisma.contentItem.create({
    data: {
      title: "LinkedIn Post: Content Operations Workflow",
      brief: "B2B post explaining how ContentOS organizes review pipelines.",
      status: "APPROVED",
      priority: "LOW",
      scheduledAt: new Date("2026-07-03T10:00:00.000Z"),
      clientId: houseOfPaper.id,
      campaignId: ecommerceCampaign.id,
      channelId: linkedin.id,
      tags: {
        create: [
          { tagId: socialTag.id },
        ],
      },
    },
  });

  console.log("Seed completed");
  console.log({
    clients: 2,
    campaigns: 2,
    channels: 4,
    tags: 4,
    contentItems: 5,
    sampleContentItem: sleeveArticle.title,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
