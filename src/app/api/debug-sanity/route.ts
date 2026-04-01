import { NextResponse } from 'next/server'
import { client } from '../../../../sanity/lib/client'

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const hasToken = !!process.env.SANITY_READ_TOKEN
  const tokenPrefix = process.env.SANITY_READ_TOKEN?.slice(0, 10)

  try {
    const events = await client.fetch(`*[_type == "event"]{ _id, title, date }`)
    return NextResponse.json({
      ok: true,
      projectId,
      dataset,
      hasToken,
      tokenPrefix,
      eventCount: events.length,
      events,
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      projectId,
      dataset,
      hasToken,
      tokenPrefix,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 })
  }
}
