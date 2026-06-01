const { Client, GatewayIntentBits, PermissionsBitField, EmbedBuilder } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// ─── Config ────────────────────────────────────────────────────────────────────

const PROTECTED_USER_ID = config.protectedUserId;       // User ID to protect
const TIMEOUT_SECONDS   = config.timeoutDuration;       // 60 or 30
const TIMEOUT_MS        = TIMEOUT_SECONDS * 1000;
const TIMEOUT_MESSAGE   = config.timeoutMessage;
const LOG_CHANNEL_ID    = config.logChannelId || null;  // Optional log channel

// ─── Ready ─────────────────────────────────────────────────────────────────────

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`🛡️  Protecting user ID: ${PROTECTED_USER_ID}`);
  console.log(`⏱️  Timeout duration: ${TIMEOUT_SECONDS}s`);
});

// ─── Message Handler ───────────────────────────────────────────────────────────

client.on("messageCreate", async (message) => {
  // Ignore bots and system messages
  if (message.author.bot || !message.guild) return;

  // Check if the message mentions the protected user
  const mentionsProtected =
    message.mentions.users.has(PROTECTED_USER_ID) ||
    message.content.includes(`<@${PROTECTED_USER_ID}>`) ||
    message.content.includes(`<@!${PROTECTED_USER_ID}>`);

  if (!mentionsProtected) return;

  // Don't timeout the protected user themselves
  if (message.author.id === PROTECTED_USER_ID) return;

  const member = message.member;
  if (!member) return;

  // Don't timeout admins / those with timeout immunity
  if (
    member.permissions.has(PermissionsBitField.Flags.Administrator) ||
    member.permissions.has(PermissionsBitField.Flags.ModerateMembers)
  ) {
    console.log(`⚠️  Skipped timeout for privileged user: ${member.user.tag}`);
    return;
  }

  // Check the bot has permission to timeout in this guild
  const botMember = message.guild.members.cache.get(client.user.id);
  if (!botMember?.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
    console.error("❌ Bot is missing the Moderate Members permission.");
    return;
  }

  // Apply the timeout
  try {
    await member.timeout(TIMEOUT_MS, `Pinged protected user (${PROTECTED_USER_ID})`);

    // Reply in the channel
    await message.reply({
      content: TIMEOUT_MESSAGE,
      allowedMentions: { repliedUser: false },
    });

    console.log(
      `🔇 Timed out ${member.user.tag} for ${TIMEOUT_SECONDS}s in ${message.guild.name}`
    );

    // Optional: log to a dedicated channel
    if (LOG_CHANNEL_ID) {
      const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
      if (logChannel) {
        const embed = new EmbedBuilder()
          .setColor(0xff4444)
          .setTitle("⏱️ Auto-Timeout")
          .addFields(
            { name: "User",     value: `${member.user.tag} (${member.user.id})`, inline: true },
            { name: "Duration", value: `${TIMEOUT_SECONDS} seconds`,             inline: true },
            { name: "Reason",   value: `Pinged <@${PROTECTED_USER_ID}>`,         inline: false },
            { name: "Channel",  value: `${message.channel}`,                     inline: true },
          )
          .setTimestamp();
        await logChannel.send({ embeds: [embed] });
      }
    }
  } catch (err) {
    console.error(`❌ Failed to timeout ${member.user.tag}:`, err.message);
  }
});

// ─── Login ─────────────────────────────────────────────────────────────────────

client.login(config.token);
