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

const sendEmailCreateUser = async (data) => {
  const mjmlTemplate = `
  <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
          <mj-image src="cid:logo" alt="Logo" width="150px" padding="0 15px 15px 0"></mj-image>
            <mj-text font-size="20px" text-align="center" color="#000000" font-family="Arial, sans-serif">Chào mừng bạn đến với trang web của chúng tôi!</mj-text>
            <mj-text font-size="16px" color="#000000" font-family="Arial, padding:10px 0 sans-serif">Xin chào ${data.fullName},</mj-text>
            <mj-text font-size="16px" color="#000000" font-family="Arial, padding:10px 0 sans-serif">Cảm ơn bạn đã đăng ký tài khoản thành công. Chúng tôi rất trân trọng sự đóng góp hỗ trợ từ bạn!</mj-text>
            <mj-text font-size="16px" color="#000000" font-family="Arial, sans-serif">Dưới đây là thông tin tài khoản của bạn:</mj-text>
          <mj-table>
            <tr style="border-bottom:1px solid #ecedee;text-align:left;">
              <th style="padding:10px 0;">Tên người dùng</th>
              <th style="padding:10px 0;">Email</th>
              <th style="padding:10px 0;">password</th>
            </tr>
            <tr>
              <td style="padding:10px 0;">${data.fullName}</td>
              <td style="padding:10px 0;">${data.email}</td>
              <td style="padding:10px 0;">${data.password}</td>
            </tr>
          </mj-table>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
`;
  const { html } = mjml2html(mjmlTemplate);
  // Tạo nội dung email
  const mailOptions = {
    from: process.env.MAIL_USERNAME, // Địa chỉ email của bạn
    to: data.email, // Địa chỉ email của người dùng
    subject: "Chào mừng bạn đến với trang web của chúng tôi!",
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

const sendEmailForgotPassword = async (data) => {
  const mjmlTemplate = `
  <mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-size="16px" color="#000000" line-height="24px" font-family="Helvetica"></mj-text>
      <mj-button font-size="16px" background-color="#007bff" color="#ffffff" font-weight="bold" border-radius="4px" padding="10px 16px"></mj-button>
    </mj-attributes>
    <mj-styles>
      .button {
        text-align: center;
      }
    </mj-styles>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image src="cid:logo" alt="Logo" width="150px" padding="0 15px 15px 0"></mj-image>
        <mj-text font-size="24px" color="#000000" font-weight="bold" line-height="30px" padding="0 0 15px 0">Reset Password</mj-text>
        <mj-text font-size="16px" color="#000000" line-height="24px" padding="0 0 15px 0">Xin chào ${data.fullName},</mj-text>
        <mj-text font-size="16px" color="#000000" line-height="24px" padding="0 0 15px 0">Bạn nhận được email này vì chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</mj-text>
        <mj-text font-size="16px" color="#000000" line-height="24px" padding="0 0 15px 0">Nhấp vào nút bên dưới để đặt lại mật khẩu của bạn:</mj-text>
        <mj-button href="${process.env.CLIENT_URL}/reset-password/${data.access_token}">Reset Password</mj-button>
        <mj-text font-size="16px" color="#000000" line-height="24px" padding="15px 0 0 0">Liên kết này sẽ hết hạn sau 1 giờ.</mj-text>
        <mj-text font-size="16px" color="#000000" line-height="24px" padding="15px 0 0 0">Nếu bạn không yêu cầu đặt lại mật khẩu thì không cần thực hiện thêm hành động nào.</mj-text>
        <mj-divider border-color="#e5e5e5" padding="15px 0"></mj-divider>
        <mj-text font-size="14px" color="#000000" line-height="20px" padding="15px 0 0 0">Nếu bạn gặp khó khăn khi nhấp vào nút "Đặt lại mật khẩu",</mj-text>

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
    subject: "Yêu cầu đặt lại mật khẩu",
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
  sendEmailCreateUser,
  sendEmailForgotPassword,
};
