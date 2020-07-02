require('dotenv').config();
const fs = require('fs-extra'); // for easy dir cp
const config = require('./config');
const addHomepage = require('./addHomepage');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET
});

// make public directory
if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

// copy static assets to /public
fs.copy(`${config.dev.static}`, `${config.dev.outDir}`);

let data = {};

const initialize = async (folderName) => {
  // fetch all images from  cloudinary
  Object.assign(
    data,
    await cloudinary.api.resources(
      {
        type: 'upload',
        prefix: folderName,
        max_results: 500, // the limit for a single call
        context: true // allows alt text to be fetched
      },
      function (error, result) {
        console.log(error);
      }
    )
  );
  console.log(data);

  addHomepage(data.resources);
};

// present issue numbers highest to lowest
//   data.titles = await Array.from(data.uniqueFolderPaths).reverse();

//   data.issues = await data.titles.map((title) =>
//     getIssue(title, data.resources)
//   );

//   if ((await data.resources.length) > 400) {
//     console.log(
//       'WARNING: you may need to make multiple calls soon to bypass 500 result limit. https://github.com/spitchell/minicomics/projects/1#card-39360692'
//     );
//   }

//   data.issues.forEach((issue) => addComic(issue));
//   addHomepage(data.issues);
//   addManifest(data.resources);
// };

initialize('quirky_creatures');

// const getIssue = (title, resources) => {
//   const pagesData = [];
//   resources.forEach((resource) => {
//     if (resource.public_id.split('/')[1] === title) {
//       // amend url to optimise image on fetch via cloudinary transformation
//       let imageParams = {
//         url: resource.secure_url.replace('upload/', 'upload/w_425/')
//       };
//       // add alt text specified at source or default message
//       Object.assign(
//         imageParams,
//         !!resource.context
//           ? { alt: resource.context.custom.alt }
//           : { alt: 'Alt text pending - apologies.' }
//       );
//       pagesData.push(imageParams);
//     }
//   });
//   return { title: title, pages: pagesData };
// };

module.exports = data;
