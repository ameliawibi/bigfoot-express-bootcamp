import { read } from "./jsonFileStorage.js";

export const extractJsonByIndex = (request, response) => {
  read("data.json", (err, data) => {
    const { index } = request.params;
    const sight = data.sightings[index];

    if (!sight) {
      response.status(404).send("Sorry, we cannot find that!");
      return;
    }

   response.render("sightings", sight)
  });
};

export const testAppleHello = (req, res) => {
  res.send("Hello");
};

export const testAppleGoodbye = (req, res) => {
  res.send("Bye");
};

export const sortJsonByStates = (request, response) => {
  read("data.json", (err, data) => {
    console.log(request.query.sort); //asc or dsc
    const sortedData = (isAscending) => {
      if (isAscending) {
        return data.sightings.sort((a, b) =>
          a.STATE > b.STATE ? 1 : b.STATE > a.STATE ? -1 : 0
        );
      }
      if (!isAscending) {
        return data.sightings.sort((a, b) =>
          a.STATE < b.STATE ? 1 : b.STATE < a.STATE ? -1 : 0
        );
      }
    };

    if (request.query.sort === "asc") {
      response.send(sortedData(true));
    }
    if (request.query.sort === "dsc") {
      response.send(sortedData(false));
    }
  });
};

export const extractJsonByYear = (request, response) => {
  read("data.json", (err, data) => {
    let sightingsFound = data.sightings.filter((sight) => {
      return request.params.YEAR === sight.YEAR;
    });
    if (sightingsFound.length === 0) {
      response.status(404).send("Sorry, we cannot find that!");
      // stop further execution in this callback
      return;
    }

    const content = `
    <html>
      <body>
        <div>
        ${sightingsFound.map((x) => `<h2>Year:${x.YEAR} State:${x.STATE}</h2>`)}
        </div>
      </body>
    </html>
  `;

    // Respond with the sights at the portion in the URL
    response.send(content);
  });
};

export const getData = (req, res) => {
  read("data.json", (err, data) => {  
  res.render("index",data);
  });
};

export const getYearData = (req, res) => {
  read("data.json", (err, data) => {  
  res.render("sightingyear",data);
  });
};
