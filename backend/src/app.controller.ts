import { Controller, Get, Session } from "@nestjs/common";
import { AppService } from "./app.service";
import { Logger } from "@nestjs/common";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() session: Record<string, any>): string {
    this.logger.log(session.id);
    return this.appService.getHello();
  }
}
