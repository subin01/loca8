/* eslint-disable  */
const header = `
<!DOCTYPE html>
<html lang="en">
<head>
<title>Loca8 Email</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<style type="text/css">
/* CLIENT-SPECIFIC STYLES */
body,
table,
td,
a {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
}

table,
td {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
}

img {
    -ms-interpolation-mode: bicubic;
}

/* RESET STYLES */
img {
    border: 0;
    height: auto;
    line-height: 100%;
    outline: none;
    text-decoration: none;
}

table {
    border-collapse: collapse !important;
}

body {
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
}

/* iOS BLUE LINKS */
a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

/* GMAIL BLUE LINKS */
u+#body a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
}

/* SAMSUNG MAIL BLUE LINKS */
#MessageViewBody a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
}

/* Embrace established conventions like underlines on links to keep emails accessible. */
a {
    color: #7ac298;
    font-weight: 600;
    text-decoration: underline;
}

a:hover {
    color: #000000 !important;
    text-decoration: none !important;
}

/* Some email clients don't properly apply media query-based styles, which is why we go mobile-first. */
@media screen and (min-width:600px) {
    h1 {
        font-size: 48px !important;
        line-height: 48px !important;
    }

    .intro {
        font-size: 24px !important;
        line-height: 36px !important;
    }
}
</style>
</head>
 
<body style="margin: 0 !important; padding: 0 !important;">
<!-- Some preview text. -->
<div style="display: none; max-height: 0; overflow: hidden;">

</div>
<!-- Get rid of unwanted preview text. -->
<div style="display: none; max-height: 0px; overflow: hidden;">
    &nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
</div>

<!-- This ghost table is used to constrain the width in Outlook. The role attribute is set to presentation to prevent it from being read by screenreaders. -->
<!--[if (gte mso 9)|(IE)]>
<table cellspacing="0" cellpadding="0" border="0" width="600" align="center" role="presentation"><tr><td>
<![endif]-->
<div role="article" aria-label="Email from Loca8" lang="en" style="background-color: white; color: #2b2b2b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 17px; font-weight: 400; line-height: 28px; margin: 0 auto; max-width: 600px; padding: 40px 20px 40px 20px;">

<header>
    <a href="https://loca8.me" style="height:100px; text-decoration: none;">
        <img src="http://cdn.mcauto-images-production.sendgrid.net/423a92dded79d29d/24a20781-42ae-41ac-93e5-056ea007c004/417x418.png" height="100" width="100" />
    </a>
</header>
<main>




`

const footer = `




</main>
<footer>
<div style="border-top: 2px solid #7ac298; margin: 40px 0 0 0; ">
    <p style="color: #666666; font-weight: 400; line-height: 24px;">
    <strong>Loca8</strong>&nbsp;‌&nbsp;‌|&nbsp;‌&nbsp;‌ www.loca8.me
    <br />Love &amp; Peace!
    </p>
</div>
</footer>

</div>
<!--[if (gte mso 9)|(IE)]>
</td></tr></table>
<![endif]-->
 
</body>
</html>
`

export { header, footer }
