const morgan = require("morgan");
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
const dashboardRoute = require("./routes/dashboardRoute");

const app = express();
const port = 3000;

// Reading json from body (client)
app.use(express.json());

// middleware: LOGGING !! third party package
app.use(morgan());

// logging basic
app.use((req, res, next) => {
  console.log("incoming request");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  req.username = "fsw2";
  next();
});

// middleware : bisa membuat express application kita membaca static file
app.use(express.static(`${__dirname}/public`));

// panggil view engine
app.set("view engine", "ejs");

app.get("/dashboard/admin/", async (req, res) => {
  try {
    res.render("index.ejs", {
      greeting: "Hello FSW2 dengan data dinamis",
    });
  } catch (error) {
    console.log(error);
  }
});

// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// Dashborad route
app.use("/dashboard/admin/", dashboardRoute);

// API routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
