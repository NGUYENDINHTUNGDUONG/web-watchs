const nodemailer = require('nodemailer');
const mjml2html = require('mjml');

const path = require('path');

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: Number(process.env.MAIL_PORT),
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
	},
});

const sendEmailCreateOrderProduct = async (data) => {
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
        <mj-text font-size="16px" color="#000000" font-family="Arial, sans-serif">Xin chào ${data.fullName},</mj-text>
        <mj-text font-size="16px" color="#000000" font-family="Arial, sans-serif">Cảm ơn bạn đã đặt hàng thành công. đơn hàng của bạn sẽ được sử lý sớm
        !</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `;
	const {html} = mjml2html(mjmlTemplate);
	// Gửi email
	const mailOptions = {
		from: process.env.MAIL_USERNAME,
		to: data.email,
		subject: 'Cảm ơn bạn đã đặt hàng',
		html,
		attachments: [
			{
				filename: 'logo.png',
				path: path.join(__dirname, '.', 'images', 'logo.png'),
				cid: 'logo',
			},
		],
	};
	await transporter.sendMail(mailOptions);
};

const sendEmailUpdateOrderStatus = async (data) => {
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
        <mj-text font-size="16px" color="#000000" font-family="Arial, sans-serif">Xin chào ${data.fullName},</mj-text>
        <mj-text font-size="16px" color="#000000" font-family="Arial, sans-serif">Cảm ơn bạn đã đặt hàng thành công. đơn hàng của bạn sẽ được sử lý sớm
        !</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `;
	const {html} = mjml2html(mjmlTemplate);
	// Gửi email
	const mailOptions = {
		from: process.env.MAIL_USERNAME,
		to: data.email,
		subject: 'Cảm ơn bạn đã đặt hàng',
		html,
		attachments: [
			{
				filename: 'logo.png',
				path: path.join(__dirname, '.', 'images', 'logo.png'),
				cid: 'logo',
			},
		],
	};
	await transporter.sendMail(mailOptions);
};
module.exports = {
	sendEmailCreateOrderProduct,
};
