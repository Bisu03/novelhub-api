const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const token = jwt.sign({ name, email, hash }, process.env.JWT_ACTIVE_KEY, {
      expiresIn: "10m",
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.USER_MAIL, // generated ethereal user
        pass: process.env.USER_PASS, // generated ethereal password
      },
    });

    const mailOptions = {
      from: "berabiswanath338@gmail.com",
      to: req.body.email,
      subject: "Activation Email",
      text: "Click the link to activate your account",
      html: `
      <body style="background-color:grey">
	<table align="center" border="0" cellpadding="0" cellspacing="0"
		width="550" bgcolor="white" style="border:2px solid black">
		<tbody>
			<tr>
				<td align="center">
					<table align="center" border="0" cellpadding="0"
						cellspacing="0" class="col-550" width="550">
						<tbody>
							<tr>
								<td align="center" style="background-color: #4cb96b;
										height: 50px;">
									
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<tr style="display: inline-block;">
				<td style="height: 150px;
						padding: 20px;
						border: none;
						border-bottom: 2px solid #361B0E;
						background-color: white;">
					
					<h2 style="text-align: left;
							align-items: center;">
						Email Recieve From ${req.body.from}
				</h2>
					<p class="data"
					style="text-align: justify-all;
							align-items: center;
							font-size: 15px;
							padding-bottom: 12px;">click the lick to active your account
					</p>
          
          <a href=${process.env.CLIENT_URL}/activate/${token} >
										<p style="color:red;
												font-weight:bold;">
											Active account
										</p>
									</a>
					<p>
					</p>
				</td>
			</tr>
		</tbody>
	</table>
</body>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(401).json({
          error: "please put correct email",
        });
      } else {
        res.status(200).json({
          message:
            "Email Sent To Your Email Id Please Follow Instruction To Active Account ",
        });
      }
    });
  } catch (error) {
    return res.status(401).json({
      error: "Something went wrong",
    });
  }
};

exports.accountActivate = async (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.JWT_ACTIVE_KEY, async (err, decode) => {
    if (err) {
      res.status(401).json({ error: "Link is expite please signin again" });
    } else {
      const { name, email, hash } = jwt.verify(
        token,
        process.env.JWT_ACTIVE_KEY
      );
      try {
        await User.create({
          name,
          email,
          password: hash,
        });

        res.status(200).json({ message: "Account activated succesfully" });
      } catch (error) {
        res.status(400).json({ error: "Something went wrong try again" });
      }
    }
  });
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isPassword = await bcrypt.compare(password, user.password);

      if (!isPassword) {
        return res
          .status(404)
          .json({ error: "Enter valid crediential user not found" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
          expiresIn: "30d",
        });
        return res.status(202).json({ message: "Login Success", token });
      }
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Enter valid crediential user not found" });
  }
};

exports.getUser = async (req, res) => {
  const getId = req.user;
  try {
    res.status(200).json(getId);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Login to access it" });
  }
};
