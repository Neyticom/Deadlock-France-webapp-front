CREATE TABLE "User" (
  "id" INT PRIMARY KEY,
  "login" VARCHAR,
  "password" VARCHAR,
  "firstname" VARCHAR,
  "lastname" VARCHAR,
  "nickname" VARCHAR,
  "email" VARCHAR,
  "2fa" BOOLEAN,
  "role_id" INT
);

CREATE TABLE "Role" (
  "id" INT PRIMARY KEY,
  "name" VARCHAR,
  "weight" INT
);

CREATE TABLE "Patchnote" (
  "id" INT PRIMARY KEY,
  "version" VARCHAR,
  "title" VARCHAR,
  "date" TIMESTAMP,
  "author" VARCHAR,
  "content" TEXT,
  "state" ENUM
);

CREATE TABLE "Log" (
  "id" INT PRIMARY KEY,
  "action" ENUM,
  "context" TEXT,
  "ip" VARCHAR,
  "user_id" INT
);

CREATE TABLE "Setting" (
  "id" INT PRIMARY KEY,
  "key" VARCHAR,
  "value" VARCHAR,
  "type" ENUM,
  "user_id" INT
);

CREATE TABLE "Statistic" (
  "id" INT PRIMARY KEY,
  "origin" VARCHAR,
  "count" INT,
  "date" TIMESTAMP,
  "type" ENUM,
  "user_id" INT
);

CREATE TABLE "UserPatchnote" (
  "user_id" INT,
  "patchnote_id" INT
);

ALTER TABLE "User" ADD FOREIGN KEY ("role_id") REFERENCES "Role" ("id");

ALTER TABLE "Log" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Setting" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Statistic" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "UserPatchnote" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "UserPatchnote" ADD FOREIGN KEY ("patchnote_id") REFERENCES "Patchnote" ("id");
