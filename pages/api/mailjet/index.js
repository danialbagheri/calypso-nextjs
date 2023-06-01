export default function mailjetFunctions(req, res) {
  const CALYPSO_LIST_ID = '86980'
  const {firstName, lastName, email} = req.body

  const mailjet = require('node-mailjet').apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
  )

  const addContactHandler = ({isExcluded = false, Name = '', Email = ''}) =>
    mailjet.post('contact', {version: 'v3'}).request({
      IsExcludedFromCampaigns: isExcluded,
      Name,
      Email,
    })

  const addContactInList = (firstName, lastName, email) =>
    mailjet
      .post('contactslist', {version: 'v3'})
      .id(CALYPSO_LIST_ID)
      .action('managecontact')
      .request({
        Name: firstName,
        Properties: {firstname: firstName, lastname: lastName},
        Action: 'addnoforce',
        Email: email,
      })

  // addContactInList(res.body.Data[0].ID)

  const mailjetAddContact = (Name, Email) =>
    addContactHandler({Name, Email})
      .then(res =>
        addContactInList(firstName, lastName, res.body.Data[0].Email),
      )
      .then(res => res)

  if (email) {
    mailjetAddContact(firstName, email)
      .then(response =>
        res
          .status(response.response.status)
          .json({message: response.response.statusCode}),
      )
      .catch(err =>
        res.status(err.statusCode).json({message: err.ErrorMessage}),
      )
  }
}
