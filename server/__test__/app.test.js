const request = require("supertest");
const { test, expect, describe } = require("@jest/globals");
const { app } = require("../app.js");

let token;

describe("POST /login", () => {
  test("success login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "password" });

    const { body, status } = response;

    token = body.token;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("token", token);
  });

  test("fail login (no email)", async () => {
    const response = await request(app)
      .post("/login")
      .send({ password: "password" });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email is required");
  });

  test("fail login (no password)", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "user1@example.com" });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Password is required");
  });

  test("fail login (invalid email)", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "wrong_email@gmail.com", password: "password" });
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error authentication");
  });

  test("fail login (invalid password)", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "wrong_password" });
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Error authentication");
  });
});

describe("POST /register", () => {
  test("success register", async () => {
    const response = await request(app).post("/register").send({
      username: "new_user",
      email: "new_user@example.com",
      password: "password",
    });

    const { body, status } = response;

    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Account successfully created");
  });

  test("fail register (email not unique)", async () => {
    const response = await request(app).post("/register").send({
      username: "new_user",
      email: "new_user@example.com",
      password: "password",
    });

    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "email must be unique");
  });
});

describe("POST /room/add", () => {
  test("success create new room", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "password" });

    token = login.body.token;

    const response = await request(app)
      .post("/room/add")
      .set("Authorization", `Bearer ${token}`);

    const { body, status } = response;

    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Room successfully created");
  }, 30000);
});

describe("GET /room/add", () => {
  test("success get all rooms", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "password" });

    token = login.body.token;

    const response = await request(app)
      .get("/room/all")
      .set("Authorization", `Bearer ${token}`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body[0]).toBeInstanceOf(Object);
  });

  test("fail get all rooms (invalid token)", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "password" });

    token = "invalid token";

    const response = await request(app)
      .get("/room/all")
      .set("Authorization", `Bearer ${token}`);

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Invalid token");
  });
});

describe("GET /room/:RoomId", () => {
  test("success get single room", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "password" });

    token = login.body.token;

    const response = await request(app)
      .get("/room/1")
      .set("Authorization", `Bearer ${token}`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });
});

describe("PUT /room/:RoomId", () => {
  test("success update room", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "password" });

    token = login.body.token;

    const response = await request(app)
      .put("/room/1")
      .send({ answer: "test answer" })
      .set("Authorization", `Bearer ${token}`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty(
      "message",
      "answer successfully added, accuracy rate successfuly calculated"
    );
  });
});

describe("DELETE /room/:RoomId", () => {
  test("success update room", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "password" });

    token = login.body.token;

    const response = await request(app)
      .delete("/room/1")
      .set("Authorization", `Bearer ${token}`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Room ID 1 deleted successfully");
  });
});
