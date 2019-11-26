let contact = `Please contact the support for any query`
let signature = `Regards`

exports.welcomeEmail = (name) => {
    return{
        heading: `Welcome!`,
        greeting: `Hi ${name}`,
        body:`Welcome to Replica`,
        contact:contact,
        signature:`${signature}`
    }
}