This app is used for creating and answering multiple choice questions.

Registered users can create questions and add answer options to them. Questions
created by other users can be asnwered by taking a quiz.

Pesonal statistics and the most accomplished users will be shown on the
statistics page.

~~The app can be tested online at: https://wsd-project--2.herokuapp.com/~~ unfortunately the app is no longer online since heroku shut down their free plan

To use the app locally create a database with the following commands:

CREATE TABLE users ( id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE, password
CHAR(60) );

CREATE TABLE questions ( id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES
users(id), title VARCHAR(256) NOT NULL, question_text TEXT NOT NULL );

CREATE TABLE question_answer_options ( id SERIAL PRIMARY KEY, question_id
INTEGER REFERENCES questions(id), option_text TEXT NOT NULL, is_correct BOOLEAN
DEFAULT false );

CREATE TABLE question_answers ( id SERIAL PRIMARY KEY, user_id INTEGER
REFERENCES users(id), question_id INTEGER REFERENCES questions(id),
question_answer_option_id INTEGER REFERENCES question_answer_options(id),
correct BOOLEAN DEFAULT false );

CREATE UNIQUE INDEX ON users((lower(email)));

Details of the used database should be added to database/database.js on the
market spot in the following style:

hostname: "hostname", database: "database", user: "user", password: "password",
port: port,

The app can be run locally with the command:

deno run --allow-net --watch --allow-read --unstable --allow-env run-locally.js

The tests can be run with the command:

deno test --allow-net --allow-read
