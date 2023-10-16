import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { NestExpressApplication } from "@nestjs/platform-express"
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

const url = process.env.FRONTEND_URL

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    
    // Sessions
    app.use(cookieParser())

    // Cors
    app.enableCors({
        origin: url,
        methods: ["GET", "POST", "PATCH", "DELETE" ],
        credentials: true
    })

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Masleeh-chat-API')
        .setDescription('Documentation for masleeh-chat-api')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('apidocs', app, document)

    await app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`)
    })
}

start()