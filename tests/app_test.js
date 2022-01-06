import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../app.js";

Deno.test({
  name: "root path /",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "register page /auth/register",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/auth/register").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "login page /auth/login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/auth/login").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "/quiz with no login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/quiz").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "/statistics with no login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/statistics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "/questions with no login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/questions").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "/questions/:id with no login",
  async fn() {
    const testClient = await superoak(app);
    const id = Math.floor(Math.random() * 100);
    await testClient.get("/questions/$1", id).expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "post to /questions/:id with no login",
  async fn() {
    const testClient = await superoak(app);
    const id = Math.floor(Math.random() * 100);
    await testClient.post("/questions/$1", id).send("option_text=text").expect(
      302,
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "post to /questions with no login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/questions").send("title=title, question_text=text")
      .expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "post to /questions/:id/delete with no login",
  async fn() {
    const testClient = await superoak(app);
    const id = Math.floor(Math.random() * 100);
    await testClient.post("/questions/$1/delete", id).expect(
      302,
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
