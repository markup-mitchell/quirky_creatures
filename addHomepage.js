const config = require('./config');
const fs = require('fs');
const showdown = require('showdown');

const converter = new showdown.Converter();

const homepageTemplate = async (
  { site_name, subheading, footer },
  creatures
) => `
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
    <h1>${site_name}</h1>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </header>
    <main>
    <div class="subheading">
    ${converter.makeHtml(subheading)}
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
                     ${footer}
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

const addHomepage = async (pageData, creatures) => {
  // const pageData = await fs.readFileSync('data/home_content/data.json', 'utf8');
  // console.log(pageData);

  // const homepage = await homepageTemplate(pageData, creatures);

  fs.writeFile(
    `${config.dev.outDir}/index.html`,
    await homepageTemplate(pageData, creatures),
    (e) => {
      if (e) throw e;
      console.log(`index.html was created successfully`);
    }
  );
};

module.exports = addHomepage;
