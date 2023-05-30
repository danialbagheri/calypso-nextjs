export default function mailjetFunctions(req, res) {
  const CALYPSO_LIST_ID = '86980'
  const {name, email} = req.body

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

  const addContactInList = contactId =>
    mailjet
      .post('contact', {version: 'v3'})
      .id(contactId)
      .action('managecontactslists')
      .request({
        ContactsLists: [
          {
            Action: 'addforce',
            ListID: CALYPSO_LIST_ID,
          },
        ],
      })

  const mailjetAddContact = (Name, Email) =>
    addContactHandler({Name, Email})
      .then(res => addContactInList(res.body.Data[0].ID))
      .then(res => res)

  if (email) {
    mailjetAddContact(name, email)
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
