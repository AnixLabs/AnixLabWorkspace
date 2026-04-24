export function verifyMail({
  userName,
  userEmail,
  otp,
  profilePicLink,
}: {
  userName: string;
  userEmail: string;
  otp: string;
  profilePicLink: string;
}) {
  const baseUrl = process.env.BASE_URL;
  const contactEmail = process.env.CONTACT_EMAIL;
  return (
    <>
      {`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Verify your email address</title>
        </head>
        <body>
          <table cellpadding="0" cellspacing="0" border="0" style="min-width: 348px" height="100%" width="100%">
            <tbody>
              <tr height="32px"></tr>
              <tr align="center">
                <td>
                  <table
                    style="padding-bottom: 20px; max-width: 600px; min-width: 220px"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <table
                                    style="direction: ltr; padding-bottom: 7px"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td align="left" width="37">
                                          <img
                                            src="${baseUrl}/assets/logo.svg"
                                            style="width: 35px; height: 35px"
                                            height="35"
                                            width="35"
                                          />
                                          <br />
                                        </td>
                                        

                                        <td
                                          style="
                                      font-family: Roboto-Light, Helvetica,
                                        Arial, sans-serif;
                                    "
                                          align="left"
                                        >
                                          Anix Lab
                                          <br />
                                        </td>
                                        <td
                                          style="
                                      font-family: Roboto-Light, Helvetica,
                                        Arial, sans-serif;
                                    "
                                          align="right"
                                        >${userName}
                                          <br />
                                        </td>
                                        <td width="35" align="right">
                                          <img
                                            src="${profilePicLink}"
                                            style="width: 32px; height: 32px"
                                            height="32"
                                            width="32"
                                          />
                                          <br />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <br />
                                </td>
                              </tr>
                              <tr>
                                <td
                                  height="5"
                                  width="6"
                                  style="
                              background: url('https://www.gstatic.com/accountalerts/email/hodor/4-corner-nw.png')
                                left top no-repeat;
                            "
                                >
                                  <div>
                                    <br />
                                  </div>
                                </td>
                                <td
                                  height="5"
                                  style="
                              background: url('https://www.gstatic.com/accountalerts/email/hodor/4-pixel-n.png')
                                center top repeat-x;
                            "
                                >
                                  <div>
                                    <br />
                                  </div>
                                </td>
                                <td
                                  height="5"
                                  width="6"
                                  style="
                              background: url('https://www.gstatic.com/accountalerts/email/hodor/4-corner-ne.png')
                                right top no-repeat;
                            "
                                >
                                  <div>
                                    <br />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  width="6"
                                  style="
                              background: url('https://www.gstatic.com/accountalerts/email/hodor/4-pixel-w.png')
                                left center repeat-y;
                            "
                                >
                                  <div>
                                    <br />
                                  </div>
                                </td>
                                <td>
                                  <div
                                    style="
                                font-family: Roboto-Regular, Helvetica, Arial,
                                  sans-serif;
                                padding-left: 20px;
                                padding-right: 20px;
                                border-bottom: thin solid rgb(240, 240, 240);
                                font-size: 24px;
                                padding-top: 40px;
                                text-align: center;
                              "
                                  >
                                    <div>
                                      <h3>
                                        Verify your email address
                                        <br />
                                      </h3>
                                      <p style="line-height: 1.8">
                                        <span
                                          style="
                                      font-family: Roboto-Regular, Helvetica,
                                        Arial, sans-serif;
                                    "
                                        >
                                          <span style="font-size: 16px; line-height: 1.8;">
                                            <a
                                              style="color: #5e5e5e; text-decoration: none;"
                                              href="mailto:${userEmail}"
                                              target="_blank"
                                            >${userEmail}</a>
                                          </span>
                                        </span>
                                        <br />
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    style="
                                font-family: Roboto-Regular, Helvetica, Arial,
                                  sans-serif;
                                font-size: 13px;
                                line-height: 1.6;
                                padding-left: 20px;
                                padding-right: 20px;
                                padding-bottom: 32px;
                                padding-top: 24px;
                              "
                                  >
                                    <p>
                                      Hi ${userName}, this email address was recently entered to create account in <a
                                        href="${baseUrl}"
                                        style="text-decoration: none;"
                                      >${baseUrl}</a>.
                                      <br />
                                    </p>
                                    <p>
                                      You can use this code to verify that this email belongs to you.
                                      <br />
                                    </p>
                                    <div style="font-size:24px;padding-top:20px;padding-bottom:20px;font-weight:bold;text-align:center">${otp}</div>
                                    <p>
                                      If this wasn’t you, someone may have mistyped their email address. Keep this code to yourself, and no other action is needed at this moment.
                                    </p>
                                    <p>
                                      The Anix Lab team
                                      <br />
                                    </p>
                                    <p>
                                      <br />
                                    </p>
                                  </div>
                                </td>
                                <td
                                  width="6"
                                  style="
                              background: url('https://www.gstatic.com/accountalerts/email/hodor/4-pixel-e.png')
                                left center repeat-y;
                            "
                                >
                                  <div>
                                    <br />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  height="5"
                                  width="6"
                                  style="
                              background: url('https://www.gstatic.com/accountalerts/email/hodor/4-corner-sw.png')
                                left top no-repeat;
                            "
                                >
                                  <div>
                                    <br />
                                  </div>
                                </td>
                                <td
                                  height="5"
                                  style="
                              background: url('https://www.gstatic.com/accountalerts/email/hodor/4-pixel-s.png')
                                center top repeat-x;
                            "
                                >
                                  <div>
                                    <br />
                                  </div>
                                </td>
                                <td
                                  height="5"
                                  width="6"
                                  style="
                              background: url('https://www.gstatic.com/accountalerts/email/hodor/4-corner-se.png')
                                left top no-repeat;
                            "
                                >
                                  <div>
                                    <br />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <br />
                                </td>
                                <td style="text-align: center;">
                                  <div
                                    style="
                                  font-family: Roboto-Regular, Helvetica, Arial,
                                    sans-serif;
                                  font-size: 12px;
                                  line-height: 20px;
                                  padding-top: 10px;
                                "
                                  >
                                    <div>
                                      You received this email to let you know
                                      about important changes to your Anix Lab Account and services.
                                      <br />
                                    </div>
                                    <p style="color: #777; font-size: 14px; text-align: center; margin-top: 20px;">
                                      <a
                                        href="${baseUrl}"
                                        style="color: #007bff; text-decoration: none;"
                                      >
                                        © Anix Lab ${new Date().getFullYear()}
                                      </a> &nbsp;|&nbsp;
                                      
                                      <a
                                        href="mailto:${contactEmail}"
                                        style="color: #007bff; text-decoration: none;"
                                      >
                                        Support Email
                                      </a>
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <br />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr height="32px"></tr>
            </tbody>
          </table>
        </body>
      </html>`}
    </>
  );
}
