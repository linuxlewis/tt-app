import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmSQLITETestingModule } from "../src/test-utils/TypeOrmSQLITETestingModule";
import { MatchModule } from "../src/match/match.module";
import { INestApplication } from "@nestjs/common";
import { configureApp } from "../src/configure";
import { MatchService } from "../src/match/match.service";
import { Socket, io } from "socket.io-client";
import { Match } from "../src/match/entities/match.entity";
import { AppGateway } from "../src/app.gateway";

describe("Matches", () => {
  let app: INestApplication;
  let matchService: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule(), MatchModule, AppGateway],
    }).compile();

    matchService = module.get<MatchService>(MatchService);

    app = module.createNestApplication();
    configureApp(app);
    await app.init();
    await app.listen(3000);
  });

  afterEach(() => {
    app.close();
  });

  describe("Create Match", () => {
    it("should create a new match when there isnt any available", async () => {
      const response = await request(app.getHttpServer()).post("/match");
      expect(response.status).toBe(201);
      expect(response.body.player1).not.toBeNull();
      expect(response.body.id).not.toBeNull();

      expect(await matchService.count()).toBe(1);

      const match = await matchService.last();
      expect(match.player1).not.toBeNull();
      expect(match.player2).toBeNull();
    });
  });

  describe("Existing match", () => {
    it("should join the user to a match when there is an existing", async () => {
      const existingMatch = await matchService.create({ player: "foo" });

      const response = await request(app.getHttpServer()).post("/match");
      expect(response.status).toBe(201);
      expect(response.body.id).toBe(existingMatch.id);
      expect(response.body.player2).not.toBeNull();
    });
  });

  describe("Update Match", () => {
    let socket: Socket;

    beforeEach((done) => {
      socket = io("http://localhost:3000");
      socket.on("connect", done);
    });

    afterEach(() => {
      socket.disconnect();
    });

    afterAll(() => {
      app.close();
    });

    it("should update the match record", async () => {
      const match = await matchService.create({ player: "foo" });

      const payload = {
        board: [
          [0, 1, null],
          [null, null, null],
          [null, null, null],
        ],
      };

      const response = await request(app.getHttpServer())
        .patch(`/match/${match.id}`)
        .send(payload)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.board).toStrictEqual(payload.board);

      const updatedMatch = await matchService.findOne(match.id);
      expect(updatedMatch.board).toStrictEqual(payload.board);
      expect(updatedMatch.player1).toBe("foo");
    });

    it("should send a websocket", async () => {
      const done = new Promise((resolve) => {
        socket.on("match", (match: Match) => {
          expect(match.board[0][0]).toBe(0);
          resolve(1);
        });
      });

      const match = await matchService.create({ player: "foo" });

      const payload = {
        board: [
          [0, 1, null],
          [null, null, null],
          [null, null, null],
        ],
      };

      await request(app.getHttpServer())
        .patch(`/match/${match.id}`)
        .send(payload)
        .set("Content-Type", "application/json");

      return await done;
    });
  });
});
