const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3030;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.post("/get-location", (req, res) => {
  console.log(req.body);
  const prevLocationId = req.body.prev_location_id;

  console.log(prevLocationId);

  if (prevLocationId == "") {
    res.json({
      location: "A1-002-03"
    });
  } else if (prevLocationId == "A1-002-03") {
    res.json({
      location: "A1-013-01"
    });
  } else if (prevLocationId == "A1-013-01") {
    res.json({
      location: "A1-028-05"
    });
  } else if (prevLocationId == "A1-028-05") {
    res.json({
      location: "B1-002-01"
    });
  } else if (prevLocationId == "B1-002-01") {
    res.json({
      location: "B1-0033-03"
    });
  } else if (prevLocationId == "B1-0033-03") {
    res.json({
      location: "{ENDED}"
    });
  }
});

app.post("/orders", (req, res) => {
  const locationId = req.body.location_id;

  console.log(locationId);

  if (locationId == "A1-002-03") {
    res.json([
      {
        orderId: "5737804577",
        basketId: 1,
        orderCode: "SMA-2881001",
        orderName: "SMA-2881001",
        imageUrl:
          "https://productimages.hepsiburada.net/s/25/551/10120914501682.jpg",
        barcode: "8699795091083",
        trackId: 1,
        quantity: 2
      },
      {
        orderId: "5737805118",
        basketId: 2,
        orderCode: "SMA-2881001",
        orderName: "SMA-2881001",
        imageUrl:
          "https://productimages.hepsiburada.net/s/25/551/10120914501682.jpg",
        barcode: "8699795091083",
        trackId: 2,
        quantity: 1
      },
      {
        orderId: "5737808169",
        basketId: 3,
        orderCode: "SMA-2881001",
        orderName: "SMA-2881001",
        imageUrl:
          "https://productimages.hepsiburada.net/s/25/551/10120914501682.jpg",
        barcode: "8699795091083",
        trackId: 3,
        quantity: 1
      }
    ]);
  } else if (locationId == "A1-013-01") {
    res.json([
      {
        orderId: "5737804577",
        basketId: 1,
        orderCode: "UNI-9288",
        orderName: "UNI-9288",
        imageUrl:
          "https://productimages.hepsiburada.net/s/31/551/10341440749618.jpg",
        barcode: "8692190010246",
        trackId: 1,
        quantity: 1
      },
      {
        orderId: "5737805118",
        basketId: 2,
        orderCode: "UNI-9289",
        orderName: "UNI-9289",
        imageUrl:
          "https://productimages.hepsiburada.net/s/27/551/10186238820402.jpg/format:webp",
        barcode: "7613036632881",
        trackId: 2,
        quantity: 1
      }
    ]);
  } else if (locationId == "A1-028-05") {
    res.json([
      {
        orderId: "5737804577",
        basketId: 1,
        orderCode: "BLA-42349001",
        orderName: "BLA-42349001",
        imageUrl:
          "https://productimages.hepsiburada.net/s/36/551/10506195238962.jpg/format:webp",
        barcode: "8699745002985",
        trackId: 1,
        quantity: 1
      },
      {
        orderId: "5737805118",
        basketId: 2,
        orderCode: "BLA-42349001",
        orderName: "BLA-42349001",
        imageUrl:
          "https://productimages.hepsiburada.net/s/36/551/10506195238962.jpg/format:webp",
        barcode: "8699745002985",
        trackId: 2,
        quantity: 3
      },
      {
        orderId: "5737808169",
        basketId: 3,
        orderCode: "HAM-8275",
        orderName: "HAM-8275",
        imageUrl:
          "https://productimages.hepsiburada.net/s/6/551/9728580386866.jpg/format:webp",
        barcode: "2558000198275",
        trackId: 3,
        quantity: 2
      }
    ]);
  } else if (locationId == "B1-002-01") {
    res.json([
      {
        orderId: "5737808169",
        basketId: 3,
        orderCode: "BAE-8991",
        orderName: "BAE-8991",
        imageUrl:
          "https://productimages.hepsiburada.net/s/32/551/10368015269938.jpg/format:webp",
        barcode: "8680075432924",
        trackId: 3,
        quantity: 2
      }
    ]);
  } else if (locationId == "B1-0033-03") {
    res.json([
      {
        orderId: "5737804577",
        basketId: 1,
        orderCode: "HIP-E9529",
        orderName: "HIP-E9529",
        imageUrl:
          "https://productimages.hepsiburada.net/s/7/551/8929771913266.jpg",
        barcode: "4062300054592",
        trackId: 1,
        quantity: 1
      },
      {
        orderId: "5737805118",
        basketId: 2,
        orderCode: "HIP-E9529",
        orderName: "HIP-E9529",
        imageUrl:
          "https://productimages.hepsiburada.net/s/7/551/8929771913266.jpg",
        barcode: "4062300054592",
        trackId: 2,
        quantity: 1
      },
      {
        orderId: "5737808169",
        basketId: 3,
        orderCode: "HIP-E9529",
        orderName: "HIP-E9529",
        imageUrl:
          "https://productimages.hepsiburada.net/s/2/551/9559373840434.jpg/format:webp",
        barcode: "4062300054592",
        trackId: 3,
        quantity: 1
      }
    ]);
  }
});

app.listen(port, () => console.log(` App listening on port ${port}!`));
