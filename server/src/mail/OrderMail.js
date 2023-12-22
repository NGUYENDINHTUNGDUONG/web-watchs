const nodemailer = require("nodemailer");
const mjml2html = require("mjml");

const path = require("path");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmailOrderProduct = async (data) => {
  const { orderItem } = data;
  const mjmlTemplate = `
  <mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-size="16px" color="#000000" line-height="24px" font-family="Helvetica"></mj-text>
      <mj-button font-size="16px" background-color="#007bff" color="#ffffff" font-weight="bold" border-radius="4px" padding="10px 16px"></mj-button>
    </mj-attributes>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
      <mj-image src="cid:logo" alt="Logo" width="150px" padding="0 15px 15px 0"></mj-image>
        <mj-text font-size="20px" color="#000000" font-family="Arial, sans-serif">Chào mừng bạn đến với trang web của chúng tôi!</mj-text>
        <mj-text font-size="16px" color="#000000" font-family="Arial, sans-serif">Xin chào ${
          data.fullName
        },</mj-text>
        <mj-text font-size="16px" color="#000000" font-family="Arial, sans-serif">Cảm ơn bạn đã đặt hàng. đơn hàng của bạn sẽ được sử lý sớm
        !</mj-text>
        <mj-table>
        <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
          <th style="padding: 0 15px 0 0;">Tên sản phẩm</th>
          <th style="padding: 0 0 15px0 ;">Số lượng</th>
          <th style="padding: 0 0 0 15px;">Giá</th>
        </tr>
        <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
          <td style="padding: 0 15px 0 0;"> ${orderItem
            .map((item) => `${item.name}`)
            .join(",")}</td>
          <td style="padding: 0 15px;">${orderItem
            .map((item) => `${item.amount}`)
            .join(",")}</td>
          <td style="padding: 0 0 0 15px;">${orderItem
            .map((item) => `${item.price}`)
            .join(",")}</td>
        </tr>
        <tr style="border-bottom:1px;text-align:left;padding:15px 0;">
          <th style="padding:15px 0  0 0;">Tổng tiền</th>
          <th style="padding: 0 0 15px0 ;"></th>
          <th style="padding: 0 0 0 15px;">${data.totalPrice}</th>
      </mj-table>

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `;
  const { html } = mjml2html(mjmlTemplate);
  // Gửi email
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: data.email,
    subject: "Cảm ơn bạn đã đặt hàng",
    html,
    attachments: [
      {
        filename: "full-logo.png",
        path: path.join(__dirname, ".", "images", "full-logo.png"),
        cid: "logo",
      },
    ],
  };
  await transporter.sendMail(mailOptions);
};
module.exports = {
  sendEmailOrderProduct,
};
