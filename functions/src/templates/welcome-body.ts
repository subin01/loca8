/* eslint-disable  */
export function welcomeTemplate({ displayName = 'There', tid = '8888-8888', key = '00000000' }: any): string {
  return `

<article style="margin: 20px 0; border-bottom: 2px solid #7ac298; ">
	<h1 style="color: #000000; font-size: 30px; font-weight: 800; line-height: 32px; margin: 20px 0;">
			<span style="color: #7ac298; font-size: 17px; font-weight: 600;">Hello ${displayName}!</span>
			<br>Welcome to Loca8!
	</h1>
</article>

<article style="margin: 40px 0 20px 0; ">
	<p>Your Tag <strong>${tid}</strong> is now activated! <br />You activation key is <strong>${key}</strong>.</p>

	<p><br /></p>

	<p>
			Please make sure this email address is marked as safe (probably add to your contact) so that it
			wouldn't go to Spam/Junk. We'll be using this email for any future communications related to a lost
			&amp; found reporting on any of your Tags.
	</p>
</article>

`
}
