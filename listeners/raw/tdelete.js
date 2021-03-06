async function tdelete(utils) {

  let msg = utils.parameter;

  if (msg.t != "MESSAGE_REACTION_ADD") return;

  let embeds = utils.embeds;
  let bot = utils.bot;

  let ticketChannel = bot.channels.get(msg.d.channel_id);

  if (ticketChannel.name.split("-")[1] != "ticket") return;

  if (ticketChannel.name.split("-")[0] == msg.d.user_id) {

    let message = await ticketChannel.fetchMessage(msg.d.message_id);

    if (message.embeds[0].description ===
      "Are you sure you want to delete this ticket? You have 30 seconds to respond with ✅ for yes or ❌ for no.") {

      let user = await bot.fetchUser(msg.d.user_id);

      if (msg.d.emoji.name == "✅") {

        message.channel.delete();

        user.send(embeds.successcloseticket(user.tag));

      } else if (msg.d.emoji.name == "❌") {

        message.edit(embeds.canceleddeleteticket(user.tag));

      } else message.reactions.forEach(reaction => reaction.remove(msg.d.user_id).catch(() => {}));


    } else if (msg.d.user_id != 661359445388951555) {

      message.reactions.forEach(reaction => reaction.remove(msg.d.user_id).catch(() => {}));

    }

  }

}

module.exports = tdelete;
