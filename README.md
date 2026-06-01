# 🛡️ Ping Timeout Bot

Auto-timeouts anyone who pings a protected user.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Edit `config.json`
| Field | Description |
|---|---|
| `token` | Your bot token from the [Discord Developer Portal](https://discord.com/developers/applications) |
| `protectedUserId` | Right-click the user → **Copy User ID** (requires Developer Mode) |
| `timeoutDuration` | `60` for 1 minute, `30` for 30 seconds |
| `timeoutMessage` | The reply sent in chat when someone is timed out |
| `logChannelId` | *(Optional)* Channel ID to log timeouts — leave `""` to disable |

### 3. Bot permissions
In the Developer Portal, give your bot these permissions:
- `Moderate Members` (required to issue timeouts)
- `Send Messages`
- `Read Message History`

When adding to your server, use the OAuth2 URL with **bot** scope and the permissions above.

### 4. Run
```bash
npm start
```

## Notes
- Admins and moderators are **never** timed out.
- The bot itself and the protected user are **never** timed out.
- The bot's role must be **higher** than the role of anyone it tries to timeout.
