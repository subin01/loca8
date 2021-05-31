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
    <a href="https://loca8.me" style="height:100px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="#06121E" cx="50" cy="50" r="50"/><path fill="#FFF" d="M91.2 48.3c-.1-.2-.2-.3-.3-.5-.1-.2-.3-.4-.4-.6 0-.1-.1-.1-.1-.2-.1-.1-.2-.2-.2-.3-.5-.6-1-1.1-1.6-1.6-.7-.6-1.5-1.3-2.2-2 .3-.2.5-.5.8-.7.4-.4.8-.7 1.2-1.2l.2-.2.1-.1c.1-.1.2-.3.3-.4.1-.1.2-.2.2-.4.4-.8.7-1.8.7-2.7 0-1.2-.3-2.4-1-3.4-.3-.5-.7-1-1.2-1.4-1.4-1-3-1.6-4.7-1.6-1.6 0-3.2.6-4.4 1.7-.5.4-.9.9-1.2 1.4-.7 1.1-1 2.3-1 3.4 0 1 .2 1.9.7 2.7.1.1.1.2.2.4.1.1.2.3.3.4l.1.1.2.2 1.2 1.2c.2.2.5.5.8.7-.8.6-1.5 1.3-2.2 2-.6.5-1.1 1-1.6 1.6-.1.1-.2.2-.2.3 0 .1-.1.1-.1.2-.1.2-.3.4-.4.6-.1.2-.2.3-.3.5-.8 1.1-1.1 2.3-1.1 3.6 0 1.6.4 3.2 1.4 4.7.4.7 1 1.3 1.6 1.9 1.7 1.5 3.8 2.4 6.1 2.4 2.2 0 4.4-.8 6.1-2.4.6-.6 1.2-1.2 1.6-1.9.9-1.4 1.4-3.1 1.4-4.7-.1-1.3-.4-2.5-1-3.7zm-9.7-9c-.2-.1-.3-.3-.4-.4 0 0 0-.1-.1-.1 0 0-.1-.1-.1-.2l-.1-.1c-.2-.3-.2-.7-.2-1 0-.4.1-.9.4-1.3.1-.2.3-.4.4-.5.4-.4 1-.6 1.6-.6.6 0 1.2.2 1.6.6.2.2.3.3.4.5.2.4.4.8.4 1.3 0 .4-.1.7-.2 1l-.1.1c0 .1-.1.1-.1.2l-.1.1c-.1.2-.3.3-.4.4-.6.5-1.4 1.2-1.5 1.3-.1-.2-.9-.8-1.5-1.3zm5.6 15.3c-.2.4-.5.7-.9 1-.9.8-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3-.3-.3-.6-.6-.9-1-.5-.8-.7-1.6-.7-2.5 0-.7.2-1.4.5-2 0-.1.1-.2.2-.3.1-.1.1-.2.2-.3 0 0 0-.1.1-.1 0 0 .1-.1.1-.2.3-.3.6-.6.9-.8 1.1-1.1 2.7-2.3 2.9-2.5.2.2 1.8 1.4 2.9 2.5.3.3.6.5.9.8 0 .1.1.1.1.2 0 0 0 .1.1.1.1.1.1.2.2.3.1.1.1.2.2.3.3.6.5 1.3.5 2-.2.9-.4 1.7-.9 2.5zM62.6 41.9c-5.3 0-9.6 4.3-9.6 9.6V51.8c-.1 2-1.3 3.8-3.1 4.7-1.3.6-2.8.7-4.2.2-1.4-.5-2.5-1.5-3.1-2.8-.6-1.3-.7-2.8-.2-4.2s1.5-2.5 2.8-3.1c1.5-.7 3.2-.7 4.6 0 1 .5 2.3 0 2.7-1 .5-1 0-2.3-1-2.7-2.6-1.2-5.6-1.2-8.2 0-1.4.7-2.6 1.6-3.5 2.8-1.7-2.2-4.5-3.7-7.5-3.7-5.3 0-9.6 4.3-9.6 9.6 0 3-2.4 5.4-5.4 5.4-2.9 0-5.2-2.2-5.4-5.1V37.4c0-1.1-.9-2.1-2.1-2.1-1.1 0-2.1.9-2.1 2.1v14.1c0 5.3 4.3 9.6 9.6 9.6 3 0 5.8-1.4 7.5-3.6 1.7 2.2 4.5 3.6 7.5 3.6 3.1 0 5.8-1.4 7.5-3.7 1.1 1.4 2.6 2.5 4.3 3.1 1.1.4 2.2.6 3.3.6 1.4 0 2.8-.3 4.1-.9 1.4-.6 2.5-1.6 3.5-2.7 1.7 2.2 4.5 3.6 7.5 3.6 2 0 3.9-.6 5.5-1.7.2 1 1 1.7 2 1.7 1.1 0 2.1-.9 2.1-2.1v-7-.5c.1-5.4-4.2-9.6-9.5-9.6zm-30.1 15c-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4 5.4 2.4 5.4 5.4-2.4 5.4-5.4 5.4zm30.1 0c-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4c3 0 5.4 2.4 5.4 5.4s-2.4 5.4-5.4 5.4z"/></svg>
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
