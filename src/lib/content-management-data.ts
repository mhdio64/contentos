import { db } from "./db";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDateRange(startsAt: Date | null, endsAt: Date | null): string {
  if (startsAt && endsAt) {
    return `${formatDate(startsAt)} – ${formatDate(endsAt)}`;
  }
  if (startsAt) {
    return `From ${formatDate(startsAt)}`;
  }
  if (endsAt) {
    return `Until ${formatDate(endsAt)}`;
  }
  return "—";
}

export async function getClients() {
  const clients = await db.client.findMany({
    include: {
      _count: {
        select: { campaigns: true, contentItems: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return clients.map((client) => ({
    id: client.id,
    name: client.name,
    slug: client.slug,
    status: client.status,
    industry: client.industry ?? "—",
    contactName: client.contactName ?? "—",
    campaignCount: client._count.campaigns,
    contentCount: client._count.contentItems,
  }));
}

export async function getClientDetail(slug: string) {
  const client = await db.client.findUnique({
    where: { slug },
    include: {
      campaigns: { orderBy: { updatedAt: "desc" } },
      contentItems: {
        include: { campaign: true, channel: true },
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  if (!client) {
    return null;
  }

  return {
    name: client.name,
    slug: client.slug,
    status: client.status,
    industry: client.industry ?? "—",
    contactName: client.contactName ?? "—",
    createdAt: formatDate(client.createdAt),
    updatedAt: formatDate(client.updatedAt),
    campaigns: client.campaigns.map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      dateRange: formatDateRange(campaign.startsAt, campaign.endsAt),
    })),
    contentItems: client.contentItems.map((item) => ({
      id: item.id,
      title: item.title,
      status: item.status,
      campaign: item.campaign?.name ?? "—",
      channel: item.channel?.name ?? "—",
      priority: item.priority,
      updatedAt: formatDateTime(item.updatedAt),
    })),
  };
}

export async function getCampaigns() {
  const campaigns = await db.campaign.findMany({
    include: { client: true },
    orderBy: { updatedAt: "desc" },
  });

  return campaigns.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    client: campaign.client.name,
    status: campaign.status,
    dateRange: formatDateRange(campaign.startsAt, campaign.endsAt),
  }));
}

export async function getContentIdeas() {
  const items = await db.contentItem.findMany({
    where: { status: "IDEA" },
    include: { client: true, campaign: true, channel: true },
    orderBy: { updatedAt: "desc" },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    client: item.client.name,
    campaign: item.campaign?.name ?? "—",
    channel: item.channel?.name ?? "—",
    priority: item.priority,
    scheduledAt: item.scheduledAt ? formatDate(item.scheduledAt) : "—",
  }));
}

export async function getChannels() {
  const channels = await db.channel.findMany({
    include: {
      _count: { select: { contentItems: true } },
    },
    orderBy: { name: "asc" },
  });

  return channels.map((channel) => ({
    id: channel.id,
    name: channel.name,
    type: channel.type,
    contentCount: channel._count.contentItems,
  }));
}

export async function getCalendarItems() {
  const items = await db.contentItem.findMany({
    where: { scheduledAt: { not: null } },
    include: { client: true, channel: true },
    orderBy: { scheduledAt: "asc" },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    client: item.client.name,
    channel: item.channel?.name ?? "—",
    status: item.status,
    dateLabel: item.scheduledAt!.toLocaleDateString("en-US", { month: "short" }),
    dayLabel: item.scheduledAt!.getDate().toString(),
    timeLabel: item.scheduledAt!.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
    scheduledAt: formatDateTime(item.scheduledAt!),
  }));
}

export async function getReviewQueue() {
  const items = await db.contentItem.findMany({
    where: { status: "REVIEW" },
    include: { client: true, campaign: true, channel: true },
    orderBy: { updatedAt: "desc" },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    client: item.client.name,
    campaign: item.campaign?.name ?? "—",
    channel: item.channel?.name ?? "—",
    priority: item.priority,
    updatedAt: formatDateTime(item.updatedAt),
  }));
}
