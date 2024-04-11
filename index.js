const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
// const random = require('random');

const FILE_PATH = './data.json';

const makeCommit = (n) => {
    if (n === 0) {
        return simpleGit().push(['origin', 'main'], (err, result) => {
            if (err) {
              console.error('Error pushing to remote repository:', err);
            } else {
              console.log('Pushed changes to remote repository:', result);
            }
          });
          
    }

    import('random').then((random) => {
        // Use the random module here
        const x = Math.floor(Math.random() * 55)
        const y = Math.floor(Math.random() * 7);
        const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();

        const data = {
            date: DATE
        }
        console.log(DATE);

        jsonfile.writeFile(FILE_PATH, data, () => {
            simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE },
                makeCommit.bind(this, --n));
        });
    }).catch((err) => {
        // Handle error
        console.log(err);
    });

}

makeCommit(500);