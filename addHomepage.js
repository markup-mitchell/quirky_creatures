const config = require('./config');
const fs = require('fs');

// creatures = array of objects:
// [{ asset_id: string(unique alphanumeric),
//  public_id: string(directoryName/filename_uniqueId),
//  format: 'png',
//  version: 1593725277,
//  resource_type: 'image',
//  type: 'upload',
//  created_at: '2020-07-02T21:27:57Z',
//  bytes: 424265,
//  width: 576,
//  height: 375,
//  url: sting(url),
//  secure_url: string(https url)
//   }
// }

const homepage = (creatures) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.description}" />
        <title>${config.siteName}</title>
        <link rel="stylesheet" href="style.css"/>
        <meta name="apple-mobile-web-app-status-bar" content="#333"/>
        <meta name="theme-color" content="#333"/>
    </head>
    <body>
        <main>
            <header>
               <h1>${config.siteName}</h1>
            </header>

            <ul class="gallery">
                ${creatures
                  .map((creature) => {
                    return `<li class="gallery__item">
                    <img src="${creature.secure_url}" alt=""/>
                    </li>
                  `;
                  })
                  .join('')}
                  </ul>
                  </main>
                  <!-- <footer>
                    
                   </footer> -->
    </body>
</html>
`;

const addHomepage = (creatures) => {
  fs.writeFile(`${config.dev.outDir}/index.html`, homepage(creatures), (e) => {
    if (e) throw e;
    console.log(`index.html was created successfully`);
  });
};

module.exports = addHomepage;
