const request = require("supertest");
const { Genre } = require("../../models/genre");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe("GET /:id", () => {
    it("should return the correct genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre" });
      await genre.save();

      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
  
        const res = await request(server).get(`/api/genres/x`);
  
        expect(res.status).toBe(404);
      });
  });
});