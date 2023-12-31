/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  img: "",
  life: 35,
  attack: 55,
  defense: 40,
  speed: 90,
  heigth: 4,
  weight: 60,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });
  describe("GET Pokemon by ID", () => {
    it("should get 200", () => agent.get("/pokemons/2").expect(200));
  });
  describe("GET Pokemon by NAME", () => {
    it("should get 200", () => agent.get("/pokemons?name=pikachu").expect(200));
  });
  describe("GET Pokemon by ID error", () => {
    it("should get 404", (done) => {
      agent.get("/pokemons/23213").expect(404, done);
    });
  });
});
