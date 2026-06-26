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
  await prisma.activity.deleteMany();
  await prisma.contact.deleteMany();
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

  await prisma.contact.createMany({
    data: [
      {
        name: "سارا احمدی",
        title: "مدیر محتوا",
        phone: "+98 912 345 6789",
        email: "sara.ahmadi@heydari-clinic.example",
        isPrimary: true,
        notes: "مسئول تأیید محتوای پزشکی و هماهنگی با تیم بالینی.",
        clientId: heydari.id,
      },
      {
        name: "رضا کریمی",
        title: "هماهنگ‌کننده عملیات",
        phone: "+98 935 111 2233",
        email: "r.karimi@heydari-clinic.example",
        isPrimary: false,
        notes: "پیگیری زمان‌بندی انتشار و ارسال فایل‌های نهایی.",
        clientId: heydari.id,
      },
      {
        name: "مریم نوری",
        title: "سرپرست بازاریابی",
        phone: "+98 912 876 5432",
        email: "maryam.nouri@houseofpaper.example",
        isPrimary: true,
        notes: "تصمیم‌گیرنده اصلی برای کمپین‌های فصلی.",
        clientId: houseOfPaper.id,
      },
      {
        name: "Ali Rezaei",
        title: "Operations Coordinator",
        phone: "+98 21 8877 6655",
        email: "ali.rezaei@houseofpaper.example",
        isPrimary: false,
        clientId: houseOfPaper.id,
      },
    ],
  });

  const heydariContacts = await prisma.contact.findMany({
    where: { clientId: heydari.id },
    orderBy: { name: "asc" },
  });
  const houseContacts = await prisma.contact.findMany({
    where: { clientId: houseOfPaper.id },
    orderBy: { name: "asc" },
  });
  const saraContact = heydariContacts.find((c) => c.name === "سارا احمدی")!;
  const rezaContact = heydariContacts.find((c) => c.name === "رضا کریمی")!;
  const maryamContact = houseContacts.find((c) => c.name === "مریم نوری")!;

  await prisma.activity.createMany({
    data: [
      {
        type: "APPROVAL",
        title: "تأیید مقاله رژیم پس از جراحی اسلیو",
        body: "سارا احمدی محتوای نهایی را بررسی و برای انتشار تأیید کرد.",
        occurredAt: new Date("2026-06-24T10:30:00.000Z"),
        clientId: heydari.id,
        contactId: saraContact.id,
      },
      {
        type: "CALL",
        title: "هماهنگی زمان‌بندی انتشار هفته جاری",
        body: "با رضا کریمی درباره فایل‌های نهایی و زمان انتشار صحبت شد.",
        occurredAt: new Date("2026-06-23T14:00:00.000Z"),
        clientId: heydari.id,
        contactId: rezaContact.id,
      },
      {
        type: "NOTE",
        title: "یادداشت داخلی تیم محتوا",
        body: "نیاز به هماهنگی با تیم بالینی برای تصاویر قبل/بعد در کمپین تابستان.",
        occurredAt: new Date("2026-06-22T09:15:00.000Z"),
        clientId: heydari.id,
      },
      {
        type: "REVISION",
        title: "درخواست اصلاح کاروسل اینستاگرام",
        body: "متن اسلاید سوم باید ساده‌تر و قابل‌فهم‌تر برای مخاطب عمومی بازنویسی شود.",
        occurredAt: new Date("2026-06-21T16:45:00.000Z"),
        clientId: heydari.id,
      },
      {
        type: "MEETING",
        title: "جلسه آغاز کمپین بازگشت به مدرسه",
        body: "مریم نوری اهداف فصلی و بودجه محتوا را مرور کرد. تمرکز روی لندینگ و لینکدین.",
        occurredAt: new Date("2026-06-25T11:00:00.000Z"),
        clientId: houseOfPaper.id,
        contactId: maryamContact.id,
      },
      {
        type: "MESSAGE",
        title: "پیام واتساپ درباره عکس محصولات",
        body: "مریم فایل‌های جدید دفترچه مدرسه را ارسال کرد تا در لندینگ استفاده شود.",
        occurredAt: new Date("2026-06-24T08:20:00.000Z"),
        clientId: houseOfPaper.id,
        contactId: maryamContact.id,
      },
      {
        type: "FOLLOW_UP",
        title: "پیگیری تأیید متن لندینگ",
        body: "منتظر بازخورد نهایی تیم بازاریابی درباره تیتر اصلی صفحه محصول.",
        occurredAt: new Date("2026-06-23T13:30:00.000Z"),
        clientId: houseOfPaper.id,
      },
      {
        type: "NOTE",
        title: "ثبت یادداشت عملیاتی",
        body: "قالب پست لینکدین برای هفته آینده آماده است؛ منتظر تأیید.",
        occurredAt: new Date("2026-06-20T10:00:00.000Z"),
        clientId: houseOfPaper.id,
      },
    ],
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
    contacts: 4,
    activities: 8,
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
