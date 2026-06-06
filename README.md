# 🤖 Ultimate Discord Bot

**One bot to rule them all.** Combines the functionality of:

| Bot | Features included |
|-----|------------------|
| **Carl-bot** | AutoMod, reaction roles, welcome messages, custom embeds |
| **Dyno Bot** | Moderation (ban/kick/mute/warn/purge), slowmode, lock/unlock |
| **Emoji.gg Bot** | Emoji search, add, remove, list via Emoji.gg API |
| **Honeypot Bot** | Suspicious username auto-ban, account-age gating |
| **PlayFab Pal Bot** | Player profile lookup, leaderboard display |
| **Security Bot** | Anti-raid, lockdown mode, rate-limit detection |
| **Server Stats Bot** | Live voice-channel member/bot/online/channel/role counters |
| **Ticket Tool Bot** | Full ticket system with modal, transcript, claim, panel |
| **Welcomer Bot** | Custom welcome/leave messages, auto-role assignment |

---

## 📋 Requirements

- **Node.js 18+** (check with `node -v`)
- A Discord bot application and token ([Discord Developer Portal](https://discord.com/developers/applications))
- Bot permissions: Administrator (or fine-grained; see below)

---

## 🚀 Quick Start

### 1. Clone / download this project

```bash
# If using git:
git clone <your-repo>
cd discord-bot

# Or just put all files in a folder called discord-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your bot

```bash
cp .env.example .env
```

Open `.env` and fill in **at minimum**:
```
BOT_TOKEN=your_token_here
CLIENT_ID=your_application_id_here
GUILD_ID=your_server_id_here   ← for instant command registration during setup
```

### 4. Start the bot

```bash
npm start
```

The bot will:
- Load all commands from `commands/`
- Register slash commands (guild-only = instant if `GUILD_ID` set)
- Start listening for events

---

## ⚙️ Configuration (`.env`)

```env
# ── Required ──────────────────────────────
BOT_TOKEN=         # Bot token from Discord Developer Portal
CLIENT_ID=         # Application ID (from Developer Portal > General Info)
GUILD_ID=          # Your server ID (right-click server → Copy Server ID)

# ── Database ──────────────────────────────
USE_QUICKDB=true   # true = SQLite (zero config). false = MongoDB (set MONGODB_URI)
MONGODB_URI=       # Only needed if USE_QUICKDB=false

# ── Log Channels (paste channel IDs) ──────
MOD_LOG_CHANNEL=        # Mod actions (ban, kick, mute, warn)
SERVER_LOG_CHANNEL=     # General events
JOIN_LEAVE_CHANNEL=     # Join/leave log
SECURITY_LOG_CHANNEL=   # Raid alerts, honeypot bans

# ── Welcome ───────────────────────────────
WELCOME_CHANNEL=   # Where welcome messages are sent

# ── Tickets ───────────────────────────────
TICKET_CATEGORY=   # Category ID for ticket channels
TICKET_LOG_CHANNEL= # Where transcripts go
SUPPORT_ROLE=      # Role pinged when a ticket opens

# ── Server Stats (voice channels) ─────────
# Create voice channels named anything and paste their IDs:
MEMBER_COUNT_CHANNEL=
BOT_COUNT_CHANNEL=
ONLINE_COUNT_CHANNEL=
CHANNEL_COUNT_CHANNEL=
ROLE_COUNT_CHANNEL=

# ── Optional Integrations ─────────────────
PLAYFAB_TITLE_ID=    # Your PlayFab title ID
PLAYFAB_SECRET_KEY=  # Your PlayFab secret key
OWNER_ID=            # Your Discord user ID (for owner-only commands)
BOT_COLOR=#5865F2    # Embed accent color
```

---

## 📜 All Commands

### 🔨 Moderation (Dyno / Carl-bot)
| Command | Description |
|---------|-------------|
| `/ban <user> [reason] [days]` | Ban a member, optionally delete message history |
| `/kick <user> [reason]` | Kick a member |
| `/mute <user> <duration> [reason]` | Timeout a member (e.g. `10m`, `1h`, `7d`) |
| `/warn <user> <reason>` | Issue a warning (stored, sent via DM) |
| `/warn list <user>` | View all warnings for a user |
| `/warn clear <user>` | Clear warnings for a user |
| `/purge <amount> [user]` | Bulk delete up to 100 messages |
| `/slowmode <seconds>` | Set channel slowmode (0 = disable) |
| `/lock [channel]` | Prevent @everyone from sending messages |
| `/unlock [channel]` | Re-allow @everyone to send messages |

### 🤖 AutoMod (Carl-bot / Dyno)
| Command | Description |
|---------|-------------|
| `/automod spam <true/false> [threshold]` | Enable anti-spam (default 5 msg/5s) |
| `/automod invites <true/false>` | Block Discord invite links |
| `/automod addword <word>` | Add a banned word |
| `/automod removeword <word>` | Remove a banned word |
| `/automod listwords` | List all banned words |
| `/automod status` | View AutoMod configuration |

### 🛡️ Security (Security Bot + Honeypot)
| Command | Description |
|---------|-------------|
| `/security minage <days>` | Auto-kick accounts younger than N days |
| `/security raidthreshold <amount>` | Joins per 10s before raid mode triggers |
| `/security lockdown` | Toggle raid lockdown manually |
| `/security status` | View current security settings |

Automatic features:
- 🍯 **Honeypot**: Bans users with suspicious usernames (discord.gg, free nitro, etc.)
- 🚨 **Anti-Raid**: Auto-kicks joiners when threshold exceeded; auto-disables after 5 min

### 🎫 Tickets (Ticket Tool)
| Command | Description |
|---------|-------------|
| `/ticket open [topic]` | Open a support ticket |
| `/ticket close` | Close this ticket (saves transcript) |
| `/ticket add <user>` | Add a user to the ticket |
| `/ticket remove <user>` | Remove a user from the ticket |
| `/ticketpanel [title] [desc]` | Post a ticket-open button panel |

Ticket features:
- Auto-creates private channel with correct permissions
- Saves full transcript to log channel on close
- Claim button for staff
- Modal for topic when opening via panel button

### 👋 Welcomer (Welcomer Bot)
| Command | Description |
|---------|-------------|
| `/welcome setchannel <channel>` | Set welcome channel |
| `/welcome setmessage <msg>` | Custom message (`{user}`, `{tag}`, `{server}`, `{count}`) |
| `/welcome test` | Preview welcome message |
| `/welcome disable` | Disable welcome messages |
| `/autorole set <role>` | Auto-assign a role to new members |
| `/autorole remove` | Remove auto-role |
| `/autorole view` | View current auto-role |

### 📊 Stats (Server Stats Bot)
| Command | Description |
|---------|-------------|
| `/stats server` | Full server statistics |
| `/stats user [user]` | User profile + roles |
| `/stats role <role>` | Role info + member count |

Live voice-channel stats update every 10 minutes automatically (configure channels in `.env`).

### 😀 Emoji (Emoji.gg Bot)
| Command | Description |
|---------|-------------|
| `/emoji search <query>` | Search Emoji.gg for emojis |
| `/emoji add <name> <url>` | Add a custom emoji from URL |
| `/emoji remove <name>` | Remove a server emoji |
| `/emoji list` | List all server emojis |
| `/emoji info <name>` | Info about a server emoji |

### 🎮 PlayFab (PlayFab Pal)
| Command | Description |
|---------|-------------|
| `/playfab player <id>` | Look up a player profile + stats |
| `/playfab leaderboard <stat> [limit]` | Show a leaderboard |

Requires `PLAYFAB_TITLE_ID` and `PLAYFAB_SECRET_KEY` in `.env`.

### ⚙️ Utility
| Command | Description |
|---------|-------------|
| `/help` | Show all commands |
| `/ping` | Bot latency |
| `/poll <question> [options] [duration]` | Create a poll (options separated by `\|`) |
| `/remind <time> <reminder>` | Set a reminder (e.g. `1h`) |
| `/reactionrole <title> <roles> <labels>` | Button-based self-roles (up to 4) |

### 🎉 Fun
| Command | Description |
|---------|-------------|
| `/8ball <question>` | Magic 8-ball |
| `/coinflip` | Flip a coin |
| `/roll [dice]` | Roll dice (e.g. `2d6`, `1d20`) |
| `/meme [subreddit]` | Random meme from Reddit |

---

## 🔐 Required Bot Permissions

When adding the bot to your server, it needs:
- **Administrator** (easiest), OR all of the following:
  - Manage Roles, Manage Channels, Manage Emojis
  - Ban Members, Kick Members, Moderate Members
  - Send Messages, Embed Links, Read Message History
  - Manage Messages, Add Reactions, Attach Files
  - View Channels, Connect (for stats voice channels)

**Enable these Privileged Intents in the Developer Portal:**
- ✅ Server Members Intent
- ✅ Message Content Intent
- ✅ Presence Intent

---

## 🗂️ Project Structure

```
discord-bot/
├── index.js                  ← Entry point
├── .env.example              ← Config template
├── package.json
├── commands/
│   ├── moderation/           ← ban, kick, mute, warn, purge, lock, slowmode
│   ├── security/             ← security, automod
│   ├── tickets/              ← ticket, ticketpanel
│   ├── welcome/              ← welcome, autorole
│   ├── stats/                ← stats
│   ├── emoji/                ← emoji
│   ├── fun/                  ← 8ball, coinflip, roll, meme
│   └── utility/              ← help, ping, poll, remind, reactionrole, playfab
├── events/
│   ├── ready.js
│   ├── guildMemberAdd.js     ← welcome, honeypot, anti-raid
│   ├── guildMemberRemove.js  ← leave messages
│   └── messageCreate.js      ← automod
├── utils/
│   ├── database.js           ← quick.db / MongoDB
│   ├── embed.js              ← shared embed factory
│   ├── moderation.js         ← logAction, parseDuration
│   ├── security.js           ← honeypot, raid detection, age gate
│   ├── serverStats.js        ← live stat channel updater
│   ├── ticketManager.js      ← full ticket lifecycle
│   ├── buttonHandler.js      ← routes button interactions
│   ├── selectHandler.js      ← routes select menus
│   └── modalHandler.js       ← routes modal submissions
└── data/
    └── bot.sqlite            ← auto-created by quick.db
```

---

## 🐛 Troubleshooting

**Bot doesn't respond to slash commands**
- Make sure `CLIENT_ID` and `GUILD_ID` are correct in `.env`
- Commands are registered on bot start — give it a few seconds
- For global commands (no `GUILD_ID`), wait up to 1 hour for Discord to propagate

**"Missing Permissions" errors**
- Ensure the bot role is above the roles it needs to assign/remove
- Check the bot has the required permissions in each channel

**PlayFab not working**
- Set both `PLAYFAB_TITLE_ID` and `PLAYFAB_SECRET_KEY` in `.env`
- Make sure your PlayFab title has the "Allow Server API" option enabled

**Server stats not updating**
- Paste the voice channel IDs (not names) into `.env`
- Discord rate-limits channel renames to ~2 per 10 min per channel; updates run every 10 min by default

---

## 📦 Dependencies

- `discord.js` ^14 — Discord API library
- `quick.db` — Zero-config SQLite database
- `node-cron` — Scheduled tasks (stat updates)
- `axios` — HTTP requests (Emoji.gg, PlayFab, Reddit)
- `ms` — Duration string parser (`1h` → milliseconds)
- `dotenv` — Environment variable loading

---

*Built with ❤️ — feel free to extend, fork, and improve!*
