const { log } = require('./log.js');
const contactAPI = require('./contactAPI.js');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function doAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      log(contactAPI.listContacts());
      break;
    case 'get':
      log(contactAPI.getContactById(id));
      break;
    case 'remove':
      const remRes = contactAPI.removeContact(id);
      log(remRes === true ? `Contact with id ${id} successfully deleted` : remRes);
      break;
    case 'add':
      const newId = Date.now();

      let errMsg = [];
      if (!name) errMsg.push('Use -n to set a contact name');
      if (!phone) errMsg.push('Use -p to specify a phone number');
      if (!email) errMsg.push('Use -e to define an e-mail address');
      if (errMsg.length > 0) {
        log(`\nError: Not all required parameters are defined!\n\n${errMsg.join('\n')}`);
        break;
      }

      const addRes = contactAPI.addContact({ id: newId, name, email, phone });
      log(addRes === true ? `${name} added successfully with id "${newId}"` : addRes);

      break;
    default:
      console.warn('Unknow action type!');
  }
}

// function doAction(arg) {
// 	console.dir(arg);
// }

doAction(argv);
