# Seeding Scripts

## Announcements Seeding

This script bulk uploads dummy announcements to your Convex database.

### Setup

1. Make sure you have your Convex deployment URL in your environment:

   ```bash
   export CONVEX_URL="https://your-convex-deployment.convex.cloud"
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Usage

Run the seeding script:

```bash
pnpm seed
```

This will:

- Transform dummy data from `dummy.ts` to match Convex schema
- Create 25 sample announcements
- Set all announcements as published (status: true)
- Map categories to match your schema

### Data Transformation

The script automatically transforms:

- `categories` array → single category string (takes first category)
- Adds `status: true` for all announcements
- Maps to your Convex schema format

### Notes

- The script processes announcements one by one for better error handling
- All dummy announcements are set as "published"
- Categories are mapped to your defined schema values
