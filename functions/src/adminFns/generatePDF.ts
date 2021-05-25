import * as functions from 'firebase-functions'

export async function generatePDF(req: any, res: any) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)

  const data = req?.query
  functions.logger.log(':::::generatePDF::v1:: ', req, data)

  res.status(200).type('application/json').send({ date: Date.now() })
}
