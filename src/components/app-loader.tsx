type AppLoaderProps = {
  message?: string
}

export function AppLoader({
  message = 'Loading',
}: AppLoaderProps) {
  return (
    <div aria-live="polite" className="app-loader" role="status">
      <div className="app-loader__tv">
        <svg
          aria-hidden="true"
          className="app-loader__art"
          viewBox="0 0 440 450"
          fill="none"
        >
          <rect width="440" height="450" rx="28" fill="#6425F5" />
          <path d="m93 279 102 11v22H99z" fill="#F04B32" />
          <path d="m347 279-102 11v22h96z" fill="#F04B32" />
          <rect x="47" y="27" width="344" height="252" rx="24" fill="#F7D8F0" />
          <rect x="59" y="39" width="320" height="228" rx="14" stroke="#19222B" strokeWidth="2" />
          <rect x="78" y="58" width="282" height="190" rx="27" fill="#858EF1" stroke="#17212A" strokeWidth="2" />
          <rect x="85" y="65" width="268" height="176" rx="21" fill="#062D3A" />
          <rect x="22" y="304" width="396" height="106" rx="17" fill="#F7D8F0" />
          <rect x="34" y="316" width="372" height="82" rx="10" stroke="#19222B" strokeWidth="2" />
          <path d="M47 331h96M47 342h96M47 353h96M47 364h96M47 375h96" stroke="#062D3A" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="190" cy="344" rx="39" ry="15" fill="#5EE0D4" stroke="#19222B" strokeWidth="2" />
          <path d="m190 332 3 8 9 2-9 3-3 8-3-8-9-3 9-2 3-8Z" fill="#6425F5" />
          <circle cx="260" cy="345" r="15" fill="#062D3A" />
          <path d="m260 327 4 11 8-8-4 11 11 4-11 4 4 11-8-8-4 11-4-11-8 8 4-11-11-4 11-4-4-11 8 8 4-11Z" fill="#F7D8F0" />
          <circle cx="311" cy="340" r="10" fill="#F4513B" stroke="#19222B" strokeWidth="2" />
          <circle cx="340" cy="340" r="10" fill="#7989F1" stroke="#19222B" strokeWidth="2" />
          <circle cx="369" cy="340" r="10" fill="#76D8A0" stroke="#19222B" strokeWidth="2" />
          <rect x="288" y="361" width="95" height="17" rx="3" fill="#062D3A" />
          <rect x="288" y="383" width="95" height="5" rx="2.5" fill="#062D3A" />
          <path d="M155 376h13v7h-13zM174 376h13v7h-13zM193 376h13v7h-13zM212 376h13v7h-13z" fill="#F6AA35" />
          <circle cx="237" cy="380" r="4" fill="#062D3A" />
          <circle cx="250" cy="380" r="4" fill="#062D3A" />
        </svg>
        <div className="app-loader__display">
          <span className="app-loader__message">{message}</span>
          <span aria-hidden="true" className="app-loader__progress">
            <span className="app-loader__progress-fill" />
          </span>
        </div>
      </div>
    </div>
  )
}
