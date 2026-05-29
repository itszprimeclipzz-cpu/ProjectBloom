// pingGuard.js — Discord bot that timeouts anyone who pings a protected user
// ─────────────────────────────────────────────────────────────────────────────
// Setup:
//   1. npm install discord.js
//   2. Fill in the three config values below
//   3. node pingGuard.js
//
// Required bot permissions (in Discord Developer Portal & server):
//   • Read Messages / View Channels
//   • Send Messages
//   • Moderate Members  ← needed to issue timeouts
// ─────────────────────────────────────────────────────────────────────────────

const { Client, GatewayIntentBits, Partials } = require("discord.js");

// ── CONFIG ────────────────────────────────────────────────────────────────────
const BOT_TOKEN        = "MTUxMDAzMDY4OTk1NTc0NTk4NQ.G37jp8.fNcvwPwpEgt6XMaYciYNWDqVlLdkrazhMNJryk";   // Bot token from Discord Dev Portal
const PROTECTED_USER_ID = "1388187970493743125";  // User ID to protect (right-click → Copy ID)
const TIMEOUT_DURATION_MS = 60_000;               // 1 minute in milliseconds
// ─────────────────────────────────────────────────────────────────────────────

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`🛡️  Protecting user ID: ${PROTECTED_USER_ID}`);
});

client.on("messageCreate", async (message) => {
  // Ignore bots and system messages
  if (message.author.bot || !message.guild) return;

  // Check if the message mentions the protected user
  const mentionedProtectedUser = message.mentions.users.has(PROTECTED_USER_ID);
  if (!mentionedProtectedUser) return;

  // Don't punish the protected user for mentioning themselves
  if (message.author.id === PROTECTED_USER_ID) return;

  const offender = message.member;

  // Make sure the member exists and isn't already timed out
  if (!offender) return;

  // Bots and server owners cannot be timed out — skip if the bot lacks permission
  if (!offender.moderatable) {
    console.warn(`⚠️  Cannot timeout ${offender.user.tag} — insufficient permissions or role hierarchy.`);
    return;
  }

  try {
    await offender.timeout(TIMEOUT_DURATION_MS, `Pinged the protected user (${PROTECTED_USER_ID})`);

    await message.reply(
      `🔇 <@${offender.id}> has been timed out for **1 minute** for pinging a protected user.`
    );

    console.log(`⏱️  Timed out ${offender.user.tag} (${offender.id}) in #${message.channel.name}`);
  } catch (err) {
    console.error(`❌ Failed to timeout ${offender.user.tag}:`, err.message);
  }
});

client.login(BOT_TOKEN);
