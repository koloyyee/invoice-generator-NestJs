import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { logger } from './logger.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const PORT = 3000;

    const config = new DocumentBuilder().build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.use(helmet({ crossOriginResourcePolicy: false }));

    app.use(logger);
    app.useGlobalFilters(new HttpExceptionFilter());
    console.log(PORT);
    await app.listen(PORT);
}
bootstrap();
