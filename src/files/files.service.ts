import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { nanoid } from 'nanoid';
import * as path from 'path'


@Injectable()
export class FilesService {
    async createFile(image: Express.Multer.File, folders: string[]) {
        try {
            const fileName = nanoid(40) + '.jpg'
            const filePath = path.resolve(__dirname, '..', '..', 'static', folders.join('/'))
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            await fs.promises.writeFile(path.join(filePath, fileName), image.buffer)

            const fileLink = `${process.env.BACKEND_URL}/${folders.join('/')}/${fileName}`
            return fileLink
        } catch (error) {
            throw new HttpException('Error with registering file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteFile(link: string) {
        try {
            const trimmedLink = link.slice((process.env.BACKEND_URL.length + 1))
            console.log(trimmedLink, ' LIASKJDBASKJDBASKDJ')
            await fs.promises.unlink(path.join(__dirname, '..', '..', 'static', trimmedLink))
            return
        } catch (error) {
            console.log(error)
        }
    }
}
