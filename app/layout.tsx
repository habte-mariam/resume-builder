import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children} {/* እዚህ ጋር ምንም አይነት ClerkProvider መኖር የለበትም */}
      </body>
    </html>
  )
}