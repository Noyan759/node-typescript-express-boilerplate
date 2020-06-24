import { Response, Request } from "express";
import { JsonController, Req, Res, Get } from "routing-controllers";

@JsonController()
export class PingController {
    @Get("/")
    public helloWorld(@Req() req: Request, @Res() res: Response): Response<unknown> {
        return res.send({ message: 'Hello World!' });
    }

    @Get("/ping")
    public ping(@Req() req: Request, @Res() res: Response): Response<unknown> {
        return res.send({ message: 'Pong' });
    }
}
