1. Fix any glaring bugs and anti patterns.

- [x] Glaring bug no 1.
      Typescript warning in src/app/api/seed/route.ts, fixed by updating src/db/index.ts to earlier
      and throw an error when the database url is not set

- Glaring bug no 2.
  Unhandled Runtime Error

  Error: Hydration failed because the initial UI does not match what was rendered on the server.
  See more info here: https://nextjs.org/docs/messages/react-hydration-error

- Glaring bug no 3.
  The reset search button is not functional

- Glaring bug no 4.
  Uncaught TypeError: advocate.yearsOfExperience.includes is not a function

2. Improve the design UI/UX to make the experience better for prospective patients. We value design heavily at Solace so feel free to flex your skills in this area. The repo is set up with tailwind but feel free to use any styling framework you’d like.
3. Consider both frontend and backend performance improvements. Assume we have a database of hundreds of thousands of advocates we need to search through.

---

My thought process notes:

- To start I am going to use the default list of returned advocates while I do an read through of the codebase, and prelimiary functionality play through with the app. Then I will configure the database and see what further bugs and info I run into.

---

Other concerns:

- I would replace the .env with an .env-example with instructions to engineers to copy the file and rename it as .env. And then instructions on obtaining secrets from other developers or a shared team secrets/passwords manager.

---

Notes for self:
Url to view FE: http://localhost:3000/
Drizzle documentation: https://orm.drizzle.team/docs/get-started-postgresql
