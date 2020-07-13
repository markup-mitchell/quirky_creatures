const config = require('./config');
const fs = require('fs');
const showdown = require('showdown');

const converter = new showdown.Converter();

let homepageData = {};

fs.readFile('data/home_content/data.json', 'utf8', function (err, data) {
  if (err) throw err;
  homepageData = JSON.parse(data);
});

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

// const transformedUrl = (url) => {
//   //  eg https://res.cloudinary.com/repo/image/upload/t_height_260/v1593725281/quirky_creatures/zebras_jvi3dx.png
//   return url.replace('upload/', 'upload/t_height_260/');
// };

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
    <h1>${homepageData.site_name}</h1>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </header>
    <main>
    <div class="subheading">
    ${converter.makeHtml(homepageData.subheading)}
    </div>
    <ul class="gallery">
                ${creatures
                  .map((creature) => {
                    return `<li class="gallery__item">
                    <img
                      title="${creature.title}"
                      src="${creature.creature_image}"
                      alt="${creature.alt_text}"/>
                    </li>
                  `;
                  })
                  .join('')}
                  </ul>
                  </main>
                  <footer>
                  <div class="footer-content">
                  <p>
                     ${homepageData.footer}
                  </p>
                  </div>
                  </footer>
                  </div>
                  <script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
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
