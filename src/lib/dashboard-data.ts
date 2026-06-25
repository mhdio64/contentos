import { db } from "./db";

export async function getDashboardKpis() {
  const [activeCampaigns, contentInReview, scheduledContent, activeChannels] = await Promise.all([
    db.campaign.count({ where: { status: "ACTIVE" } }),
    db.contentItem.count({ where: { status: "REVIEW" } }),
    db.contentItem.count({ where: { status: "SCHEDULED" } }),
    db.channel.count(),
  ]);

  return {
    activeCampaigns,
    contentInReview,
    scheduledContent,
    activeChannels,
  };
}

export async function getContentPipeline() {
  const items = await db.contentItem.findMany({
    where: {
      status: {
        notIn: ["PUBLISHED", "ARCHIVED", "IDEA"],
      },
    },
    include: {
      client: true,
      channel: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 10,
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    client: item.client.name,
    stage: item.status, // We can format this in UI if needed, or keep enum string
    type: item.channel?.name || "Unassigned",
  }));
}

export async function getCampaignPerformance() {
  const campaigns = await db.campaign.findMany({
    include: {
      client: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 10,
  });

  return campaigns.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    client: campaign.client.name,
    status: campaign.status,
  }));
}

export async function getUpcomingContent() {
  const items = await db.contentItem.findMany({
    where: {
      scheduledAt: {
        not: null,
      },
      status: "SCHEDULED",
    },
    orderBy: {
      scheduledAt: "asc",
    },
    take: 10,
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    scheduledAt: item.scheduledAt as Date,
  }));
}
