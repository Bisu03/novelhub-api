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
      <body>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">

  <tbody><tr>
    <td align="center">
      <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody><tr>
          <td align="center" valign="top" background="https://designmodo.com/demo/emailtemplate/images/header-background.jpg" bgcolor="#66809b" style="background-size:cover; background-position:top;height=" 400""="">
            <table class="col-600" width="600" height="400" border="0" align="center" cellpadding="0" cellspacing="0">

              <tbody><tr>
                <td height="40"></td>
              </tr>


<!-- 								<tr>
                <td align="center" style="line-height: 0px;">
                  <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://designmodo.com/demo/emailtemplate/images/logo.png" width="109" height="103" alt="logo">
                </td>
              </tr> -->



              <tr>
                <td align="center" style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
                  WEB <span style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 7px;">NOBEL HUB</span>
                </td>
              </tr>





              <tr>
                <td align="center" style="font-family: 'Lato', sans-serif; font-size:15px; color:#ffffff; line-height:24px; font-weight: 300;">
                  A creative email template for your email campaigns, promotions <br>and products across different email platforms.
                </td>
              </tr>


              <tr>
                <td height="50"></td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody></table>
    </td>
  </tr>


<!-- END HEADER/BANNER -->


<!-- START 3 BOX SHOWCASE -->

  <tr>
    <td align="center">
      <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
        <tbody><tr>
          <td height="35"></td>
        </tr>

        <tr>
          <td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">Account activation email from web nobe hub</td>
        </tr>

        <tr>
          <td height="10"></td>
        </tr>


        <tr>
          <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
            Active your account by siply click active now
          </td>
        </tr>

      </tbody></table>
    </td>
  </tr>

  <tr>
    <td align="center">
      <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
        <tbody><tr>
          <td height="50"></td>
        </tr>
        <tr>


          <td align="center" bgcolor="#34495e">
            <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
              <tbody><tr>
                <td height="35"></td>
              </tr>


              <tr>
                <td>
                <a href=${process.env.CLIENT_URL}/activate/${token}  align="center" style="font-family: 'Raleway', sans-serif; font-size:20px; color:#f1c40f; line-height:24px; font-weight: bold;">
                Active Now
                </a>
                </td>
              </tr>

              <tr>
                <td height="40"></td>
              </tr>

            </tbody></table>
          </td>
        </tr>
      </tbody></table>
    </td>
  </tr>


  <tr>
    <td align="center">
      <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
        <tbody><tr>
          <td height="50"></td>
        </tr>
        <tr>
          <td align="center" bgcolor="#34495e" background="https://designmodo.com/demo/emailtemplate/images/footer.jpg" height="185">
            <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
              <tbody><tr>
                <td height="25"></td>
              </tr>

                <tr>
                <td align="center" style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#f1c40f;">Follow us for some cool stuffs</td>
                </tr>


              <tr>
                <td height="25"></td>
              </tr>



              </tbody></table><table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
              <tbody><tr>
                <td align="center" width="30%" style="vertical-align: top;">
                    <a href="https://www.facebook.com/designmodo" target="_blank"> <img src="https://designmodo.com/demo/emailtemplate/images/icon-fb.png"> </a>
                </td>

                <td align="center" class="margin" width="30%" style="vertical-align: top;">
                   <a href="https://twitter.com/designmodo" target="_blank"> <img src="https://designmodo.com/demo/emailtemplate/images/icon-twitter.png"> </a>
                </td>

                <td align="center" width="30%" style="vertical-align: top;">
                    <a href="https://plus.google.com/+Designmodo/posts" target="_blank"> <img src="https://designmodo.com/demo/emailtemplate/images/icon-googleplus.png"> </a>
                </td>
              </tr>
              </tbody></table>



            </td></tr></tbody></table>
          </td>
        </tr>
      </tbody></table>
    </td>
  </tr> 
      </tbody></table>
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
          joinedOn: new Date().toISOString().substring(0, 10),
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

exports.getUser = async (req, res) => {
  const getId = req.user;
  try {
    res.status(200).json(getId);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Login to access it" });
  }
};

exports.getAllUser = async (req, res) => {
  const Check = req.user;
  try {
    if (Check.role == "Admin" || Check.role == "SuperAdmin") {
      const data = await User.find({});
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ error: "You are not permited" });
    }
  } catch (error) {
    return res.status(400).json({ error: "somethig went wrong" });
  }
};

exports.updateUser = async (req, res) => {
  const Check = req.user;

  try {
    if (Check.role == "SuperAdmin") {
      const { id, role, isBlocked } = req.body;
      const data = await User.findByIdAndUpdate(
        id,
        { role, isBlocked },
        { new: true }
      );
      return res.status(200).json({ message: "update Success" });
    } else {
      const { id, pic, name } = req.body;
      const data = await User.findByIdAndUpdate(
        id,
        { pic, name },
        { new: true }
      );
      return res.status(200).json({ message: "user updated Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Login to access it" });
  }
};
