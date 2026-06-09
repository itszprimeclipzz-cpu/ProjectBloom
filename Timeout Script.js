if (message.mentions.users.has('1388187970493743125')) {
    if (!message.member.permissions.has('ModerateMembers')) { // don't timeout mods
        message.member.timeout(10 * 60 * 1000, 'Pinged protected user') // 10 min
    }
}
