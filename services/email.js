const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;

    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = "link for production";
        break;

      default:
        this.link = "http://localhost:3000";
        break;
    }
  }
  #createTemplateVerifyEmail(token) {
    const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "Contacts Holder",
        link: this.link,
      },
    });
    const emailBody = {
      body: {
        name: "Anonymous",
        intro: "Welcome to Contacts Holder!",
        action: {
          instructions:
            "To get started with Contacts Holder, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${token}`,
          },
        },
      },
    };

    return mailGenerator.generate(emailBody);
  }
  async verifiedPasswordEmailSender(token, email) {
    const emailBody = this.#createTemplateVerifyEmail(token);
    const result = await this.sender.send({
      to: email,
      subject: "Verify your account",
      html: emailBody,
    });
    console.log(result);
  }
}

module.exports = EmailService;
