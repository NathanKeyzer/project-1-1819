import { API } from "../../node_modules/oba-wrapper/js/index.js";
const voorkeur = document.querySelector(".voorkeur");
const element = document.querySelector(".boeken");

async function init(query) {
  console.log("hallo");
  const oba = new API({
    key: "1e19898c87464e239192c8bfe422f280"
  });
  render.loading();
  const stream = await oba.createStream("search/" + query);
  stream.pipe(render.book);
  // stream.pipe(toJSON);
}
function toJSON(stream) {
  console.log(stream);
}
//kortere manier van render
// const renders = {
//   results(data) {
//     console.log(data);
//     let template = data.map(data => {
//       return `
//         <p>${data.titles.title._text}</p>
//         `;
//     });
//
//     element.innerHTML = template.join("");
//   }
// };

//eigen data renderen
const render = {
  element: document.querySelector(".boeken"),
  book: data => {
    render.element.innerHTML = "";
    data.forEach(book => {
      let template = `<section>
      <a href="${book["detail-page"]._text}" target="blank"><img src="${
        book.coverimages && book.coverimages.coverimage[1]
          ? book.coverimages.coverimage[1]._text
          : "https://via.placeholder.com/180x268.png?text=Niet+Beschikbaar"
      }"></a>
      <div>
      <p>${
        book.titles["short-title"] && book.titles["short-title"]
          ? book.titles["short-title"]._text
          : "Niet beschikbaar"
      }</p>
      <p>${
        book.authors && book.authors["main-author"]
          ? book.authors["main-author"]._text
          : "Niet gevonden"
      }</p></div>
      </section>`;
      render.element.innerHTML += template;
    });
  },
  loading: () => {
    render.element.innerHTML = `
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>`;
  }
};

function handleInput(dorus) {
  console.log(voorkeur[2].value);
  dorus.preventDefault();
  init(voorkeur[2].value);
}
voorkeur.addEventListener("submit", handleInput);
init("Amsterdam");
