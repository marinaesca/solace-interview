1. Fix any glaring bugs and anti patterns.

- [x] Glaring bug no 1.
      Typescript warning in src/app/api/seed/route.ts, fixed by updating src/db/index.ts to earlier
      and throw an error when the database url is not set

- [x] Glaring bug no 2.
      Typescript warning in src/app/page.tsx about a possible null value for this line
      document.getElementById("search-term").innerHTML = searchTerm;
      Replaced this use of grabbing the element by id, with using state and a component instead.

- [x] Glaring bug no 3.
      Uncaught TypeError: advocate.yearsOfExperience.includes is not a function
      This was fixed as part of a larger clean up.
      I added a type for 'Advocate' based on the schema.
      I updated the advocates, filteredAdvocates, and searchTerm states to be typed. And then I
      resolved this bug when I updated the filtering within the onChange() function to filter
      yearsOfExperience by checking for a numeric only search and then using GTE. As just
      allowing users to search for soley exact match on years of experience would be a poor experience.

- [x] Glaring bug no 4.
      "Search does not work"
      I was testing using "doe" which due to case insensitivity was not capturing "Doe". Updated logic
      to be case insensitive.

- Glaring bug no 5.
  Unhandled Runtime Error

  Error: Hydration failed because the initial UI does not match what was rendered on the server.
  See more info here: https://nextjs.org/docs/messages/react-hydration-error

- Glaring bug no 6.
  The reset search button is not functional

2. Improve the design UI/UX to make the experience better for prospective patients. We value design heavily at Solace so feel free to flex your skills in this area. The repo is set up with tailwind but feel free to use any styling framework you’d like.
3. Consider both frontend and backend performance improvements. Assume we have a database of hundreds of thousands of advocates we need to search through.

---

My thought process notes:

- To start I am going to use the default list of returned advocates while I do an read through of the codebase, and prelimiary functionality play through with the app. Then I will configure the database and see what further bugs and info I run into.
- Added a type for Advocate (based on the schema), and added typing to the useStates.

---

Other concerns:

- Security for dotenv: I would replace the .env with an .env-example with instructions to engineers to copy the file and rename it as .env. And then instructions on obtaining secrets from other developers or a shared team secrets/passwords manager.

- Pagination: I would add pagination on the backend and front end. I would allow for querying for x amount of advocates at a time, which would improve effeciency as the amount of available advocates scaled. To do this I would update the backend API to take a page number and x amount of advocates to be returned. To round that out, I would update the front end to only display x amount of advocates at a time. A page number footer would need to be added, as well as pagination logic for what request should be sent to the api based on what navigation button was selected. Please note, to not break filtering functionality, this would need to be paired with serverside filtering fuctionality.

- Serverside filtering: This would improve efficiency as the amount of advocates scaled, and allow for pairing with pagination. I would update the FE to send the filter search terms to the api. I would then filter against the database and return the relevant advocates. This is faster than returning all data on all advocates to the FE, and then filtering on the FE. This also works smoothly in parallel with pagination because of the following scenario. Imagine you are paginating by 50 advocates per page, and then the user attempts to use filtering, this filtering will only be applied to the current returned 50 advocates and result a misrepresentation of returned data. There may be other advocates who fit the criteria but were not returned in that page. In summary, adding serverside filtering would improve performance, and allow for a successful implementation of pagination.

---

Notes for self:
Url to view FE: http://localhost:3000/
Drizzle documentation: https://orm.drizzle.team/docs/get-started-postgresql
