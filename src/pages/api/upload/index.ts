import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs"
import path from "path"
import formidable, { File } from 'formidable'

/* Don't miss that! */
export const config = {
  api: {
    bodyParser: false,
  }
}

type ProcessedFiles = Array<[string, File]>

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let id = req.query.id
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' + id }

  /* Get files using formidable */
  const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
    const form = new formidable.IncomingForm()
    const files: ProcessedFiles = []
    form.on('file', function (field, file) {
      files.push([field, file])
    })
    form.on('end', () => resolve(files))
    form.on('error', err => reject(err))
    form.parse(req, () => {
    })
  }).catch(e => {
    console.log(e)
    status = 500
    resultBody = {
      status: 'fail', message: 'Upload error'
    }
  })

  if (files?.length) {
    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), `/public/uploads/`)
    try {
      await fs.access(targetPath)
    } catch (e) {
      await fs.mkdir(targetPath)
    }

    /* Move uploaded files to directory */
    for (const file of files) {
      const tempPath = file[1].filepath
      const ext = path.extname('' + file[1].originalFilename)
      let nameFormated = id + ext
      await fs.rename(tempPath, targetPath + `${id}${ext}`)
    }
  }

  res.status(status).json(resultBody)
}

export default handler