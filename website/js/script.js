const url =
  "https://student-api-proxy.onrender.com/api/fitness-calculator.p.rapidapi.com/foodids?subtablename=Fo1_2";
const options = {
  method: "GET",
  headers: {
    "X-API-Key":
      "73b1497dbad4468f117467169d2f81f6ecef4206a63acf5b21e23c8f5b9c578b",
  },
};

fetch(url, options)
  .then((response) =>
    response.json().then((result) => {
      console.log(result.data); // Your API data
      console.log(`Cost: $${result.meta.cost}`);
      console.log(`Remaining: $${result.meta.remaining_budget}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
