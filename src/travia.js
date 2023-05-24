const { ButtonStyle, ComponentType } = require("discord.js");
const dbi = require("../dbi.js");
const fs = require("fs");

const questions = JSON.parse(fs.readFileSync("./data/true-false-questions.json", "utf-8"));

dbi.register(({ Button, Event }) => {
  function ask() {
    const { client } = dbi.data.clients.first();
    /** @type {import("discord.js").TextBasedChannel} */
    const ch = client.channels.cache.get("1083098851541516399");
    const qIndex = Math.floor(Math.random() * questions.length);
    const question = questions[qIndex];
    if (!ch) return;

    ch.send({
      content: `> - ${question.question}`,
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            dbi.interaction("trivia:answer-button").toJSON({
              overrides: {
                style: ButtonStyle.Success,
                label: "Evet"
              },
              reference: {
                data: [qIndex, 1]
              }
            }),
            dbi.interaction("trivia:answer-button").toJSON({
              overrides: {
                style: ButtonStyle.Danger,
                label: "Hayır"
              },
              reference: {
                data: [qIndex, 0]
              }
            }),
          ]
        }
      ]
    });
  }
  Event({
    name: "ready",
    id: "trivia:ready",
    onExecute() {
      ask();
      setInterval(ask, 60 * 1000 * 60);
    }
  });
  Button({
    name: "trivia:answer-button",
    async onExecute({ interaction, data }) {
      let qIndex = data[0];
      let question = questions[qIndex];
      await interaction.deferUpdate();
      interaction.message.edit({
        components: [],
        content: question.answer == !!data[1]
          ? `> - ${question.question}\n> **${interaction.user.tag}**, soruyu ${data[1] ? "Evet" : "Hayır"} ile __doğru__ cevapladı!` :
          `> - ${question.question}\n> **${interaction.user.tag}**, soruyu ${data[1] ? "Evet" : "Hayır"} ile __yanlış__ cevapladı!`
      });
    }
  })
})