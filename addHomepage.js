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

const transformedUrl = (url) => {
  //  eg https://res.cloudinary.com/repo/image/upload/t_height_260/v1593725281/quirky_creatures/zebras_jvi3dx.png
  return url.replace('upload/', 'upload/t_height_260/');
};

const homepage = (creatures) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.description}" />
        <title>${config.siteName}</title>
        <link rel="stylesheet" href="style.css"/>
        <meta name="apple-mobile-web-app-status-bar" content="#333"/>
        <meta name="theme-color" content="#333"/>
    </head>
    <body>
    <div class="wrapper">
    
    <header>
    <h1>${config.siteName}</h1>
    </header>
    
    <main>
    <ul class="gallery">
                ${creatures
                  .map((creature) => {
                    return `<li class="gallery__item">
                    <img src="${transformedUrl(creature.secure_url)}" alt=""/>
                    </li>
                  `;
                  })
                  .join('')}
                  </ul>
                  </main>
                  <footer>
                  <div class="footer-content">
                  <p>
                     All images &copy; Lyanne Mitchell 2020
                  </p>
                  </div>
                  </footer>
                  </div>
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
