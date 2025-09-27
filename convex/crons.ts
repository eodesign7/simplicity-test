import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Auto-publish announcements every 15 minutes
crons.interval(
  "auto-publish-announcements",
  { minutes: 15 },
  internal.announcements.autoPublishScheduled
);

export default crons;
