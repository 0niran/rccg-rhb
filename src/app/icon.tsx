import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 6,
          border: '2px solid #92400e',
        }}
      >
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          🏛️
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}