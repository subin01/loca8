/* eslint-disable  */
export function returnTemplate({
  tid = '',
  displayName = '',
  name = '',
  phone = '',
  email = '',
  message = '',
}: any): string {
  return `

<article style="margin: 20px 0; border-bottom: 2px solid #7ac298; ">
	<h1 style="color: #000000; font-size: 30px; font-weight: 800; line-height: 32px; margin: 20px 0;">
			<span style="color: #7ac298; font-size: 17px; font-weight: 600;">Hello Subin Paul!</span>
			<br>Someone found your Loca8 Tag!
	</h1>
</article>


<article style="margin: 40px 0 20px 0; ">
	<p>
	Your Tag <strong>${tid}</strong> is reported to be found by someone!	<br />
  Here are the details to reach the reporter
	</p>

	<p>
  Name: <strong>${name}</strong>	<br />
	Phone: <strong>${phone}</strong><br />
	${email && 'Email: <strong>' + email + '</strong><br />'}
	${message && 'Message: <br /><strong>' + message + '</strong>'}
	</p>

	<p><br /></p>

	<p>
			If you have not lost this Tag or if you think this is a spam, Please let us know!
	</p>
</article>

`
}
