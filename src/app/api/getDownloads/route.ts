
import { JSDOM } from 'jsdom'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET(req: any, res: NextApiResponse) {

  const {searchParams} = new URL (req.url)
  const url = searchParams.get('url') as string

  console.log(url);
  

  const response = await fetch(`https://www.npmjs.com/package/${url}`)
  const html = await response.text()

  const dom = new JSDOM(html)
  const document = dom.window.document
  const downloads = document.querySelector('._9ba9a726')?.textContent

  console.log("downloads:", downloads) // Log the value to the console

  return NextResponse.json({ downloads })
}