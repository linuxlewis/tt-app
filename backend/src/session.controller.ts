import { Controller, Get, Session } from "@nestjs/common";

@Controller("session")
export class SessionController {
  @Get()
  getSession(@Session() session: Record<string, any>) {
    return { id: session.id };
  }
}
