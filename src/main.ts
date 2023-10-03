import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { NestExpressApplication } from "@nestjs/platform-express"
import * as cookieParser from 'cookie-parser'

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    
    // Sessions
    app.use(cookieParser())

    await app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`)
    })
}

start()