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
	<div style="background-color:transparent;">
	<div class="block-grid"
		style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
			<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
			<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#ffffff;width:500px; border-top: 4px solid F3F3F6; border-left: 1px solid F3F3F6; border-bottom: 1px solid F3F3F6; border-right: 1px solid F3F3F6;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
			<div class="col num12"
				style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 498px;">
				<div class="col_cont" style="width:100% !important;">
					<!--[if (!mso)&(!IE)]><!-->
					<div
						style="border-top:4px solid F3F3F6; border-left:1px solid F3F3F6; border-bottom:1px solid F3F3F6; border-right:1px solid F3F3F6; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
							style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
							valign="top" width="100%">
							<tbody>
								<tr style="vertical-align: top;" valign="top">
									<td class="divider_inner"
										style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
										valign="top">
										<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
											role="presentation"
											style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 3px solid #ECECF2; width: 100%;"
											valign="top" width="100%">
											<tbody>
												<tr style="vertical-align: top;" valign="top">
													<td
														style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
														valign="top"><span></span></td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
						<div
							style="color:#000000;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.5;padding-top:30px;padding-right:30px;padding-bottom:30px;padding-left:30px;">
							<div class="txtTinyMce-wrapper"
								style="font-size: 14px; line-height: 1.5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000000; mso-line-height-alt: 21px;">




								<p
									style="margin: 0; font-size: 16px; line-height: 1.5; word-break: break-word; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
									<span style="color: #7ac298; font-size: 16px;"><strong>Hello ${displayName}!</strong></span>
								</p>
								<p
									style="margin: 0; font-size: 34px; line-height: 1.5; word-break: break-word; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 51px; margin-top: 0; margin-bottom: 0;">
									<span style="font-size: 34px;"><strong>Someone found your Loca8 Tag!</strong></span>
								</p>
								<p
									style="margin: 0; font-size: 16px; line-height: 1.5; word-break: break-word; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
									 </p>
								<p
									style="margin: 0; font-size: 18px; line-height: 1.5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 27px; margin-top: 0; margin-bottom: 0;">
									<span style="font-size: 18px;">
									Your Tag ${tid} is reported to be found by someone!
									<br />Here are the details to reach the reporter <br/>
									<br />Name: <strong>${name}</strong>
									<br />Phone: <strong>${phone}</strong>
									${email && '<br />Email: <strong>' + email + '</strong>'}
									${message && '<br />Message: <br/><strong>"' + message + '"</strong>'}
									</span>
								</p>
								<p
									style="margin: 0; font-size: 16px; line-height: 1.5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
									 </p>
								<p
									style="margin: 0; font-size: 16px; line-height: 1.5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
									<span style="font-size: 16px;">If you have not lost this Tag or if you think this is a spam, Please let us know!</span>
								</p>
								<p
									style="margin: 0; font-size: 16px; line-height: 1.5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
									<span style="font-size: 16px;"> </span>
								</p>
								<p
									style="margin: 0; font-size: 16px; line-height: 1.5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
									 </p>

								<p
									style="margin: 0; font-size: 16px; line-height: 1.5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
									 </p>
							</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation"
							style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
							valign="top" width="100%">
							<tbody>
								<tr style="vertical-align: top;" valign="top">
									<td class="divider_inner"
										style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
										valign="top">
										<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content"
											role="presentation"
											style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 3px solid #ECECF2; width: 100%;"
											valign="top" width="100%">
											<tbody>
												<tr style="vertical-align: top;" valign="top">
													<td
														style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
														valign="top"><span></span></td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<!--[if (!mso)&(!IE)]><!-->
					</div>
					<!--<![endif]-->
				</div>
			</div>
			<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
			<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
	</div>
</div>
  `
}
