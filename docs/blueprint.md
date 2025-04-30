# **App Name**: VectorMatcher

## Core Features:

- Add Job API: API endpoint to add job postings to the database, generating and storing a mock embedding vector.
- Add Candidate API: API endpoint to add candidate profiles to the database, generating and storing a mock embedding vector.
- Match Candidates API: API endpoint to find the top 3 matching candidates for a job based on cosine similarity of their embedding vectors.
- Input Forms: Forms to input job and candidate details and submit them to the backend.
- Display Matches: Display the list of the top 3 matched candidates with basic details.

## Style Guidelines:

- Primary color: Light gray (#f0f0f0) for a clean and professional look.
- Secondary color: White (#ffffff) for backgrounds and content areas.
- Accent: Teal (#008080) for buttons and interactive elements.
- Clear and readable typography with good contrast.
- Simple and intuitive layout for easy navigation.
- Subtle loading animations to indicate processing.

## Original User Request:
Goal: Build a minimal job-candidate matching system using vector similarity in PostgreSQL, and deploy a basic frontend for it. The focus is on backend engineering, frontend integration, database knowledge, and deployment ability. (No AI model development is required for this challenge.)
Deliverables
Code Repository: A GitHub repo (or downloadable ZIP) containing your solution.


Working Application: Both backend and frontend code, ready to run.


Database Schema: An .sql migration or schema file showing the table definitions (including the pgvector setup).


Documentation: A short README explaining how you simulated embeddings and performed cosine similarity.


Live Demo: A deployed frontend (on Vercel) demonstrating the working application.


Part 1: Backend (NestJS API)
Create a NestJS backend service with a PostgreSQL database (using the pgvector extension) to support the following API endpoints and functionality:
POST /api/jobs: Accepts a new job posting (e.g. title and description) in JSON and inserts it into the database. This should include generating and storing an embedding vector for the job using a mock method (since no real ML model is used).


POST /api/candidates: Accepts a new candidate profile (e.g. name and summary/skills) in JSON and inserts it into the database, also generating a mock embedding vector for the candidate.


POST /api/match: Accepts input (such as a job description or a job ID) and returns the top 3 matching candidates from the database, based on cosine similarity between the job’s embedding vector and candidate embedding vectors. The response should be a JSON list of the best-matching candidates.


Database Setup: Enable the pgvector extension in PostgreSQL and create two tables (e.g. jobs and candidates). Each table should have an appropriate schema including a vector-type column to store the embedding (e.g. VECTOR(… dimensionality…)). Implement a method (e.g. a TypeScript utility function) to produce mock embeddings for any given job or candidate input – for example, generating a fixed-dimension numeric array based on the text. Use a cosine similarity query (via pgvector) to compare vectors and find nearest neighbors for the matching logic.
Part 2: Frontend (Next.js App)
Create a simple Next.js frontend application (React) that interacts with your backend API. The UI can be minimal but should provide the following functionality:
Add a New Job: A form to input job details (title/description) and submit to the POST /api/jobs endpoint.


Add a New Candidate: A form to input candidate details (name/summary or skills) and submit to POST /api/candidates.


Match Candidates to a Job: An interface (e.g. a button or form) to trigger the POST /api/match endpoint (for example, by selecting a job or entering a job description) and view the results.


View Results: Display the list of the top 3 matched candidates returned by the backend, with basic details for each candidate.


Ensure the frontend is user-friendly enough to be evaluated quickly: include simple loading states (e.g. a spinner or message while waiting for API responses) and handle empty states (e.g. no data available or no matches found). The exact design isn’t critical, but the functionality should be clear and working.
Deployment: Deploy the frontend application to Vercel (mandatory) so that we can access a live demo via URL. Make sure the frontend is configured to communicate with your backend (this could be running locally or deployed as well – just note in your README how to point the frontend to the backend). The deployed app should allow us to test adding entries and getting match results in real-time.
Sample Data (Optional)
You can use the following example data to seed your system (this is optional, but can help in testing quickly):
Candidates:


Celena Chang – Formerly at Flatiron Health; expert in React, TypeScript, PostgreSQL; CS grad from UC Berkeley.


Alonso Koumba – Ex-Google engineer; expert in Python and PostgreSQL; CS grad from Stanford.


Calvin Goah – Engineer at IXL Learning; skilled in Node.js, React, PostgreSQL; CS grad from Columbia.


Jobs:


Sieve – Product involving SDK development; uses Next.js, Python, Redis. (https://app.synapserecruiternetwork.com/job-page/1739325412738x464955390864130050)
Avoca – Company focused on AI Agents; stack includes PostgreSQL and cloud services. (https://app.synapserecruiternetwork.com/job-page/1742268268675x324687029811806200)


Koodos – Platform for data pipelines; uses Kafka and ClickHouse. (https://app.synapserecruiternetwork.com/job-page/1742408181643x243451860587905020)
Feel free to adjust or ignore this sample data. It’s provided just in case you want to pre-populate the database for demonstration or use these as test inputs for matching. (The mock embeddings in your implementation would presumably encode the essence of these descriptions in vector form.)
Evaluation Criteria
Your submission will be evaluated on the following:
PostgreSQL & pgvector Setup: Correct use of pgvector (extension enabled, vector columns created) and a schema that supports the use case.


API Functionality: The backend endpoints perform as specified (able to add jobs/candidates and return relevant matches correctly).


Cosine Similarity Logic: Proper implementation of vector similarity matching (returning reasonable top-3 results based on the mock embeddings).


Frontend Implementation: A working Next.js UI that integrates with the API, allowing us to exercise the core features (adding data and viewing matches).


Code Quality: Clean, readable, and well-organized code for both backend and frontend. Include comments or documentation as needed to clarify your approach.


Deployment & Usability: The application (at least the frontend) is deployed and easy to test. A live link on Vercel is provided. (Bonus points if the backend is also accessible or if everything “just works” in the live demo.)


Suggested Project Structure
To save time, you may structure your repository as follows (this is only a suggestion):
/backend – NestJS app (Node/TypeScript) containing the API.


/frontend – Next.js app (React/TypeScript) containing the UI.


/scripts/schema.sql – SQL DDL or migration file to set up the database schema (tables, vector extension, etc.).


/utils/mockVectors.ts – A helper module to generate mock embedding vectors from text input.


/data/sample.json – (Optional) seed file with sample jobs and candidates data.


You can use any tools or libraries you are comfortable with to expedite development (e.g. NestJS CLI, ORMs or query builders, etc., and Next.js frameworks). The key is to fit the implementation within roughly 1 hour of coding, so prioritize core functionality.
Important Notes
No AI/ML Development Required: You do not need to train or integrate any real machine learning model. You should simulate the embeddings (e.g., using a simple function that returns a random or deterministic vector for a given input). The focus is on how you handle data and integrate the vector similarity feature, not on the model itself.


Time Management: This challenge is designed to be completed in about an hour. It’s okay if not all bells and whistles are in place – focus on getting a working vertical slice of the application (backend→database→frontend→deployment). Clean, working code is preferred over a multitude of features.


Clean Setup: In your README, include clear instructions on how to run the backend and frontend locally, and how to initialize the database (including applying the schema and any sample data). Also mention the URL of the deployed frontend.


Bonus (Optional)
If you finish the core requirements early and want to showcase more, you can implement a basic search feature on the frontend to filter or find candidates by name. For example, a simple text input that allows the user to type a name and client-side filter the candidate list, or an additional API endpoint (e.g. GET /api/candidates?search=name) to query candidates by name. This is not required, but a nice extra touch if you have time.

Good luck, and happy coding! We look forward to seeing your solution.
  