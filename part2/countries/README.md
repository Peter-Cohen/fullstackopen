# Some notes on excercises Part 2 - countries

## General

- After showing the results, the program basically ends. How to make it so that we can continue with a new search?
<br>
<br>
- Remember to restart React when changing the `.env` file
<br>
<br>

## `Weather`  component

- Because we initially set the state variable `weather` to `null`, we can just use it in the ternary without having
to check for an empty Object.

    An empty Object is neither truthy nor falsy, but `null` is falsy.
 <br>
 <br>


## Edge cases

### Sudan

Solved this by using another piece of state `[ selectedCountry, setSelectedCountry ]`.

Upon clicking we pass `selectedCountry` to CountryDetails,  if there is one country left in `filteredCountries` we pass that.

<br>
<br>

### United States Minor Outlying Islands

The API does not provide coordinates for its capital (in fact its capital is listed as Washington DC).

No coordinates means that we can not show weather details. 
<br>
<br>